class Point2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    distance(other) {
        return new Vector2(this, other).magnitude()
    }
}

class Vector2 {
    static fromPoints(p1, p2) {
        return new Vector2(p2.x - p1.x, p2.y - p1.y)
    }

    constructor(dx, dy) {
        this.dx = dx
        this.dy = dy
    }

    reflectX() {
        return new Vector2(-this.dx, this.dy)
    }

    reflectY() {
        return new Vector2(this.dx, -this.dy)
    }

    move(p) {
        return new Point2(this.dx + p.x, this.dy + p.y)
    }

    add(v) {
        return new Vector2(v.dx + this.dx, v.dy + this.dy)
    }

    scale(d) {
        return new Vector2(this.dx * d, this.dy * d)
    }

    dot(v) {
        return this.dx * v.dx + this.dy * v.dy
    }

    magnitude() {
        return Math.abs(Math.sqrt(this.dot(this)))
    }

    normalize() {
        return this.scale(1 / this.magnitude())
    }
}

class Disk {
    constructor(position, velocity, radius, color) {
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color
    }

    move() {
        this.position = this.velocity.move(this.position)
    }

    checkBounds(x, y) {
        var r = this.radius, d = 2 * r,
            dx = this.velocity.dx, dy = this.velocity.dy,
            px = this.position.x, py = this.position.y

        if (x > d && ((dx < 0 && px - r <= 0) || (dx > 0 && px + r >= x)))
            this.velocity = this.velocity.reflectX()
        if (y > d && ((dy < 0 && py - r <= 0) || (dy > 0 && py + r >= y)))
            this.velocity = this.velocity.reflectY()
    }

    checkCollision(disk) {
        var direction = Vector2.fromPoints(this.position, disk.position)

        if (direction.magnitude() <= this.radius + disk.radius) {
            var u = direction.normalize(),
                v1 = this.velocity,
                v2 = disk.velocity

            if (v1.dot(u) - v2.dot(u) > 0) {
                var v1n = u.scale(v1.dot(u)), // v1n = u(v1 * u)
                    v2n = u.scale(v2.dot(u)), // v2n = u(v2 * u)
                    v1t = v1.add(v1n.scale(-1)), // v1t = v1 - v1n
                    v2t = v2.add(v2n.scale(-1)), // v2t = v2 - v2n
                    v1p = v2n.add(v1t), // v1' = v2n + v1t
                    v2p = v1n.add(v2t) // v2' = v1n + v2t

                this.velocity = v1p
                disk.velocity = v2p
            }
        }
    }

    paint(ctx) {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.moveTo(this.position.x, this.position.y)
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true)
        ctx.fill()
    }
}

let randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

class DiskCollisions {
    constructor(el) {
        this.el = el
        this.height = this.el.height = this.el.offsetHeight
        this.width = this.el.width = this.el.offsetWidth
        this.ctx = this.el.getContext('2d', { alpha: false })
        this.disks = Array.from({ length: 100 }, (_, i) => new Disk(
            new Point2(randInt(0, 100), randInt(0, 100)),
            new Vector2(randInt(1, 3), randInt(1, 3)),
            randInt(5, 20),
            `rgb(${randInt(10, 255)},${randInt(10, 255)},${randInt(10, 255)})`
        ))

        window.addEventListener('resize', this.onResize.bind(this))
    }

    cls() {
        this.el.width = this.el.width
    }

    onResize() {
        this.height = this.el.height = this.el.offsetHeight
        this.width = this.el.width = this.el.offsetWidth
    }

    run() {
        this.cls()
        this.disks.forEach((disk) => {
            disk.paint(this.ctx)
            disk.checkBounds(this.el.width, this.el.height)

            this.disks.forEach((otherDisk) => {
                if (disk !== otherDisk)
                    disk.checkCollision(otherDisk)
            })
            disk.move()
        })

        requestAnimationFrame(this.run.bind(this))
    }
}

let diskCollisions = new DiskCollisions(document.querySelector('.demo-disk-collisions'))
diskCollisions.run()

export { Point2, Vector2 }
