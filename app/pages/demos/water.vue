<template>
    <div class="flex flex-col items-center p-8 gap-4">
        <h1 class="m-0 text-4xl">2D Water Ripple Effect</h1>
        <p class="m-0 text-gray-600">Click or drag on the canvas to create ripples</p>
        <div class="flex gap-2 items-center">
            <label class="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                <input type="file" accept="image/*" class="hidden" @change="handleImageUpload">
                <span class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Upload Background Image</span>
            </label>
        </div>
        <div v-if="isLoading" class="text-gray-500">Loading...</div>
        <canvas v-show="!isLoading" ref="canvasRef" width="640" height="480"
            class="border-2 border-gray-800 cursor-crosshair touch-none bg-black" @mousedown="handleMouseDown"
            @mousemove="handleMouseMove" @mouseup="handleMouseUp" @mouseleave="handleMouseUp"
            @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" />

        <article class="max-w-3xl mt-8 space-y-4">
            <h2 class="text-2xl font-bold">About This Effect</h2>

            <p>
                This is a real-time implementation of the classic 2D water ripple simulation, originally popularized in
                the
                late 1990s. The effect creates realistic-looking water ripples that propagate, reflect, and gradually
                fade
                over time, all achieved through an elegant algorithm that runs entirely on the CPU.
            </p>

            <h3 class="text-xl font-semibold mt-6">How It Works</h3>

            <p>
                Unlike simple per-pixel filters (like grayscale or brightness adjustments), the water ripple effect is a
                <strong>spatial filter</strong> that examines neighboring pixels to create dynamic motion. The algorithm
                maintains two height field buffers representing the current and previous state of the water surface.
            </p>

            <h4 class="text-lg font-semibold mt-4">The Core Algorithm</h4>

            <p>
                At each frame, the algorithm applies a convolution-like operation to propagate waves:
            </p>

            <ol class="list-decimal list-inside space-y-2 ml-4">
                <li>
                    <strong>Average neighbors:</strong> For each pixel, calculate the average height of its four
                    neighbors
                    (left, right, top, bottom)
                </li>
                <li>
                    <strong>Apply wave equation:</strong> Subtract the previous frame's height from this average to
                    simulate wave propagation
                </li>
                <li>
                    <strong>Apply damping:</strong> Multiply by a damping factor (0.95) to gradually lose energy,
                    preventing ripples from continuing indefinitely
                </li>
                <li>
                    <strong>Swap buffers:</strong> Exchange current and previous buffers for the next iteration
                </li>
            </ol>

            <h4 class="text-lg font-semibold mt-4">Rendering with Refraction</h4>

            <p>
                To visualize the ripples, the renderer calculates texture coordinate offsets based on height differences
                between neighboring pixels. This simulates light refraction through water, creating the characteristic
                distortion effect. Additionally, horizontal gradients provide shading to enhance the three-dimensional
                appearance.
            </p>

            <h3 class="text-xl font-semibold mt-6">Technical Characteristics</h3>

            <ul class="list-disc list-inside space-y-2 ml-4">
                <li>
                    <strong>Temporal simulation:</strong> Uses two buffers to track state over time, enabling wave
                    propagation
                </li>
                <li>
                    <strong>Convolution kernel:</strong> Implicitly applies a 3×3 kernel that averages cardinal
                    neighbors
                </li>
                <li>
                    <strong>Integer arithmetic:</strong> Uses bit shifting for division to improve performance
                </li>
                <li>
                    <strong>Edge handling:</strong> Processes only non-edge pixels to avoid boundary conditions
                </li>
                <li>
                    <strong>Real-time performance:</strong> Despite processing ~300,000 pixels per frame, runs smoothly
                    on
                    modern hardware
                </li>
            </ul>

            <h3 class="text-xl font-semibold mt-6">Physical Accuracy</h3>

            <p>
                While not a precise physics simulation, this technique produces visually convincing results. Ripples
                naturally propagate outward from disturbances, reflect off boundaries, and exhibit
                constructive/destructive
                interference when they overlap. The damping factor mimics energy dissipation in real water.
            </p>

            <p class="text-sm text-gray-600 mt-6">
                <strong>Reference:</strong> This implementation is based on Hugo Elias's classic water ripple algorithm
                from the late 1990s, which demonstrated that realistic water effects could be achieved without expensive
                trigonometric calculations or physics engines.
            </p>
        </article>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null),
    isLoading = ref(true)
let ctx: CanvasRenderingContext2D | null = null,
    animationId: number | null = null,
    // Water simulation buffers
    buffer1: Int32Array,
    buffer2: Int32Array,
    width = 0,
    height = 0,
    // Background texture
    textureData: ImageData | null = null,
    // Mouse state
    isMouseDown = false,
    lastMouseX = -1,
    lastMouseY = -1

// Damping factor (must be less than 1.0 for ripples to fade)
const damping = 0.95

/**
 * Clamp a value between min and max
 */
function clamp({ value, min, max }: { value: number, min: number, max: number }): number {
    return Math.max(min, Math.min(max, value))
}

/**
 * Initialize the water simulation buffers
 */
function initBuffers({ w, h }: { w: number, h: number }) {
    width = w
    height = h
    const size = width * height
    buffer1 = new Int32Array(size)
    buffer2 = new Int32Array(size)

    // Fill with zeros
    buffer1.fill(0)
    buffer2.fill(0)
}

/**
 * Create a background texture
 */
function createTexture(image?: HTMLImageElement) {
    if (!ctx) return

    const imageData = ctx.createImageData(width, height),
        data = imageData.data

    if (image) {
        // Draw the uploaded image to a temporary canvas
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = width
        tempCanvas.height = height
        const tempCtx = tempCanvas.getContext('2d')
        if (tempCtx) {
            tempCtx.drawImage(image, 0, 0, width, height)
            const imgData = tempCtx.getImageData(0, 0, width, height)
            data.set(imgData.data)
        }
    }
    else {
        // Create a simple gradient/pattern background
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * 4,
                    // Create a checkered pattern with gradient
                    checker = ((Math.floor(x / 32) + Math.floor(y / 32)) % 2) * 30,
                    gradientR = Math.floor((x / width) * 100) + 100 + checker,
                    gradientG = Math.floor((y / height) * 100) + 150 + checker,
                    gradientB = 200 + checker

                data[idx] = gradientR // R
                data[idx + 1] = gradientG // G
                data[idx + 2] = gradientB // B
                data[idx + 3] = 255 // A
            }
        }
    }

    textureData = imageData
}

/**
 * Process water simulation - the core algorithm
 * This implements the classic water ripple algorithm
 */
function processWater() {
    // For each pixel (excluding edges)
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x,
                // Calculate average of 4 neighboring cells
                average = (
                    buffer1[idx - 1]! + // left
                    buffer1[idx + 1]! + // right
                    buffer1[idx - width]! + // top
                    buffer1[idx + width]! // bottom
                ) >> 1 // Divide by 2 (bit shift for performance)

            // Apply wave equation: new = average - previous
            buffer2[idx] = average - buffer2[idx]!

            // Apply damping to lose energy over time
            buffer2[idx] = Math.floor(buffer2[idx] * damping)
        }
    }

    // Swap buffers
    const temp = buffer1
    buffer1 = buffer2
    buffer2 = temp
}

/**
 * Render the water with refraction and shading
 */
function renderWater() {
    if (!ctx || !textureData) return

    const outputData = ctx.createImageData(width, height),
        output = outputData.data,
        texture = textureData.data

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x,
                // Calculate refraction offsets based on height differences
                xOffset = buffer1[idx - 1]! - buffer1[idx + 1]!,
                yOffset = buffer1[idx - width]! - buffer1[idx + width]!,
                // Calculate shading based on horizontal offset
                shading = xOffset

            // Get texture coordinates with refraction
            let texX = x + (xOffset >> 3), // Divide by 8 for subtle effect
                texY = y + (yOffset >> 3)

            // Clamp texture coordinates
            texX = clamp({ value: texX, min: 0, max: width - 1 })
            texY = clamp({ value: texY, min: 0, max: height - 1 })

            const texIdx = (texY * width + texX) * 4,
                outIdx = idx * 4

            // Apply shading to texture color
            output[outIdx] = clamp({ value: texture[texIdx]! + shading, min: 0, max: 255 })
            output[outIdx + 1] = clamp({ value: texture[texIdx + 1]! + shading, min: 0, max: 255 })
            output[outIdx + 2] = clamp({ value: texture[texIdx + 2]! + shading, min: 0, max: 255 })
            output[outIdx + 3] = 255
        }
    }

    ctx.putImageData(outputData, 0, 0)
}

/**
 * Create a disturbance at the given coordinates
 */
function disturb({ x, y, radius = 3, strength = 512 }: { x: number, y: number, radius?: number, strength?: number }) {
    const clampedX = clamp({ value: x, min: radius, max: width - radius - 1 }),
        clampedY = clamp({ value: y, min: radius, max: height - radius - 1 })

    // Create a circular disturbance
    for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance <= radius) {
                const idx = (clampedY + dy) * width + (clampedX + dx),
                    falloff = 1 - (distance / radius)
                buffer1[idx] = Math.floor(strength * falloff)
            }
        }
    }
}

/**
 * Animation loop
 */
function animate() {
    processWater()
    renderWater()
    animationId = requestAnimationFrame(animate)
}

/**
 * Get canvas coordinates from mouse event
 */
function getCanvasCoords(event: MouseEvent | Touch): { x: number, y: number } {
    if (!canvasRef.value) return { x: 0, y: 0 }
    const rect = canvasRef.value.getBoundingClientRect()
    return {
        x: Math.floor(event.clientX - rect.left),
        y: Math.floor(event.clientY - rect.top)
    }
}

// Mouse event handlers
function handleMouseDown(event: MouseEvent) {
    isMouseDown = true
    const { x, y } = getCanvasCoords(event)
    lastMouseX = x
    lastMouseY = y
    disturb({ x, y })
}

function handleMouseMove(event: MouseEvent) {
    if (!isMouseDown) return
    const { x, y } = getCanvasCoords(event)

    // Interpolate between last position and current for smooth ripples
    if (lastMouseX !== -1 && lastMouseY !== -1) {
        const dx = x - lastMouseX,
            dy = y - lastMouseY,
            steps = Math.max(Math.abs(dx), Math.abs(dy))

        for (let i = 0; i <= steps; i++) {
            const t = steps > 0 ? i / steps : 0,
                ix = Math.floor(lastMouseX + dx * t),
                iy = Math.floor(lastMouseY + dy * t)
            disturb({ x: ix, y: iy, radius: 2, strength: 384 })
        }
    }

    lastMouseX = x
    lastMouseY = y
}

function handleMouseUp() {
    isMouseDown = false
    lastMouseX = -1
    lastMouseY = -1
}

/**
 * Handle image upload
 */
function handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement,
        file = input.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
            createTexture(img)
        }
        img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
}

// Touch event handlers
function handleTouchStart(event: TouchEvent) {
    event.preventDefault()
    const touch = event.touches[0]
    if (touch) {
        const { x, y } = getCanvasCoords(touch)
        disturb({ x, y })
    }
}

function handleTouchMove(event: TouchEvent) {
    event.preventDefault()
    const touch = event.touches[0]
    if (touch) {
        const { x, y } = getCanvasCoords(touch)
        disturb({ x, y, radius: 2, strength: 384 })
    }
}

function handleTouchEnd(event: TouchEvent) {
    event.preventDefault()
}

onMounted(() => {
    if (!canvasRef.value) return

    const canvas = canvasRef.value
    ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize simulation
    initBuffers({ w: canvas.width, h: canvas.height })
    createTexture()

    // Start animation
    animate()

    // Hide loading message
    isLoading.value = false

    // Create random raindrops periodically
    setInterval(() => {
        const x = Math.floor(Math.random() * width),
            y = Math.floor(Math.random() * height)
        disturb({
            x,
            y,
            radius: Math.floor(Math.random() * 3) + 2,
            strength: Math.floor(Math.random() * 256) + 256
        })
    }, 1000)
})

onUnmounted(() => {
    if (animationId !== null)
        cancelAnimationFrame(animationId)
})
</script>
