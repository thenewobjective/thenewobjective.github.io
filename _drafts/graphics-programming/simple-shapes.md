---
layout: post
icon: file-text
category: Graphics Programming
title:  "- Simple Shapes"
date:   2030-04-29 02:00:00 -0600
permalink: /graphics-programming/simple-shapes
commentThreadId: -1
---

As children we learned about simple 2D shapes, so they seem to be an appropriate place to start.
Let's introduce the concept of a shape:

```js
class Shape {}
```

Simply a name. Now we'll introduce a few variants:

```js
class Square extends Shape {
    constructor({size}) {
        super()
        this.size = size
    }
}

class Circle extends Shape {
    constructor({radius}) {
        super()
        this.radius = radius
    }
}

class RightTriangle extends Shape {
    constructor({base, height}) {
        this.base = base
        this.height = height
    }
}
```

There are many more shapes of course but this is enough to work with for now. Let's add a couple
derived properties that may prove useful later: `area` and `perimeter`.

```js
class Square extends Shape {
    ...
    get area() { return this.size**2 }
    get perimeter() { return this.size * 4 }
}

class Circle extends Shape {
    ...
    get area() { return Math.PI * this.radius**2 }
    get perimeter() { return 2 * Math.PI * this.radius }
}

class RightTriangle extends Shape {
    ...
    get area() { return this.base * this.right / 2 }
    get perimeter() { return this.base + this.height + Math.hypot(this.base, this.height) }
}
```

Finally, we'll wrap them up in a module `shapes` and move on:

```js
class Shape {}

class Square extends Shape { ... }

class Circle extends Shape { ... }

class RightTriangle extends Shape { ... }

export {Shape, Square, Circle, RightTriangle}
```

You can download the module <a href="/scripts/graphics-programming/shapes.js">here</a>.
