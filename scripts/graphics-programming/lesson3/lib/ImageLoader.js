import ImageGraphic from './ImageGraphic.js'

class ImageLoader {
    async load(url) {
        const image = await new Promise((resolve, reject) => {
                const img = Object.assign(new Image(), {
                    onload(){ resolve(img) },
                    onerror(err){ reject(err) },
                    src: url
                })
            }),
            {width, height} = image,
            canvas = Object.assign(document.createElement('canvas'), {height, width}),
            ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)

        return new ImageGraphic({
            imageData: ctx.getImageData(0,0, width, height)
        })
    }
}

export default ImageLoader