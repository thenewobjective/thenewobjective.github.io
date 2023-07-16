---
layout: post
icon: file-text
category: Tile Graphics
title:  "0 - From Domain to Display"
date:   2023-07-15 18:30:00 -0600
permalink: /tile-graphics/from-domain-to-display
---

When beginning a new project, there are two key questions that need to be answered:

1. What is the domain of discourse?
2. What are the use cases?

The domain of discourse is the "language" of the project, it defines
and constrains the problem space. For example, if the domain is furniture,
then we know that the word "table" means something different from the domain of
spreadsheets. In our case, the domain is tile-based graphics,
so we know there is a `Tile` concept.

The use cases are the things that the project needs to do for the user. In this
case, we need to be able to render a tile to the screen. This is a very simple
use case, but it is a good starting point.

## The Domain

A `Tile` represents an `image` and a `size`. We'll assume that the tile is square,
so the width and height will be the same. The `image` represents the tile's
appearance. We have a challenge though, we need to represent the image in a way
that remains agnostic to the display. Within the domain layer, we don't know
anything about how entities are utilized nor do we want to. So we need to represent
the image without reference to file formats, paths, or any other environment
related concept. We can use an ID to represent the image. It can be a string,
number, or any other type that can be used to uniquely identify it. Since we
expect to have a lot of tiles, a string name seems like a poor idea especially
with similar tiles ("grass1", "grass2", "yellowgrass", etc.). So we'll use a
number.

```ts
// src/domain/Tile.mts
export class Tile {
    constructor(
        readonly id: number,
        readonly size: number
    ) { }
}
```

### Value Objects and Entities

This is a good time to introduce the concept of *Value Objects* and *Entity Objects*.
A value object is an object that is identified by its attributes. For example,
a 2D point is identified by its `x` and `y` coordinates. If we have two points
with the same coordinates, then they are considered equal. In contrast, an
entity is an object that is identified by a single attribute: its identity
attribute (`id`). Entities are objects that can change over time while still
being considered equal. For example, a `Person` can change their address, but
they are still the same person. If we consider the `Tile` class, it is an entity
because it can change over time. For example, we can change the size
and still consider it a Grass tile. However, if we change the `id`, then
it is no longer the same.

## The Use Case

Our first and only use case is to render a tile to the screen. We don't know
what a screen is, nor which tile to render, nor how to get the image
associated with it. Luckily, we don't need to know any of that. We can define
a use case via ["Wishful Thinking"](http://wiki.c2.com/?WishfulThinking) and
delegation. We'll assume (and require) that there is some form of `Presenter`
that can render a tile, and that there is some form of `Repository` that can
retrieve the appropriate tile based on its ID and size.

```ts
// src/application/Presenter.mts
export interface Presenter<T> {
    present(entity: T): void;
}
```

```ts
// src/application/Repository.mts
export interface Repository<K, V> {
    get(id: K): V;
}
```

Repositories generally store entities only. If you think about it for a moment,
it makes sense. If a repository stored value objects, then how would you look
them up? You would need to know all attributes of the object in
order to find it. Which means you already have the value object. Instead, we
store entities in repositories and use the identity attribute to look them up.
We don't know the format of the identity attribute, so we use a generic type
parameter `K` to represent it.

This distinction between value objects and entities is important enough that
we should make it explicit in our code. Let's return to the Domain layer and
represent the concept of an entity:

```ts
// src/domain/Entity.mts
export abstract class Entity<K> {
    constructor(readonly id: K) { }

    equals(other: Entity<K>): boolean {
        return this.id === other.id;
    }
}
```

Now we can make the `Tile` class extend `Entity`:

```ts
// src/domain/Tile.mts
import { Entity } from "./Entity.mjs";

export class Tile extends Entity<number> {
    constructor(
        readonly id: number,
        readonly size: number
    ) { super(id); }
}
```

These changes now enable our Repository to be more explicit:

```ts
// src/application/Repository.mts
import { Entity } from "../domain/Entity.mjs";

export interface Repository<K, V extends Entity<K>> {
    get(id: K): V;
}
```

Now, back to our use case:

```ts
// src/application/usecases/RenderTileUseCase.mts
import { Presenter } from "../Presenter.mjs";
import { Repository } from "../Repository.mjs";
import { TileDto } from "../models/TileDto.mjs";

export class RenderTileUseCase {
    constructor(
        private readonly _presenter: Presenter<TileDto>,
        private readonly _repository: Repository<number, TileDto>
    ) { }

    execute(id: number, size: number): void {
        const tile = this.repository.get(id);
        const dto = new TileDto(tile.id, tile.size);
        this.presenter.present(dto);
    }
}
```

```ts

```

The above interfaces represent our requirements for the use case and the contract
that client code must fulfill. In order for someone to use the `RenderTileUseCase`,
they must provide a `Presenter` and a `Repository`. The `RenderTileUseCase` is
then responsible for delegating to the `Presenter` and `Repository` to fulfill
the use case.

If you squint a little, you can see that the `RenderTileUseCase` is an instance
of the [Command Pattern](https://en.wikipedia.org/wiki/Command_pattern). It
encapsulates the request to render a tile, and it delegates to the `Presenter`
and `Repository` to fulfill the request. We could make the concept of a `Command`
explicit, but it's not necessary at this point and would just be a
[False Abstraction](https://mortoray.com/the-false-abstraction-antipattern/).

## The Data Layer

The data layer is responsible for managing the persistence of data. In our case,
we need to be able to get a concrete `Tile` based on an abstract one. So what
is a concrete `Tile` specifically? Practically it's just a `Tile` with an image
associated with it. There are a lot of ways to represent an image, but we'll
use a [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) since we know
that the environment is a web browser.

```ts
// src/data/TileDto.mts
import { Tile } from "../domain/Tile.mjs";

export class TileDto extends Tile {
    constructor(
        readonly id: number,
        readonly size: number,
        readonly image: URL
    ) {
        super(id, size);
    }
}
```

You'll notice that the class has a `Dto` suffix. This is because the class
represents a [*Data Transfer Object*](https://en.wikipedia.org/wiki/Data_transfer_object).
A DTO is an object that is used to transfer data between application layers and potentially
across a network or process boundary. In our case, the `TileDto` is used to transfer
data between the data layer and the use case layer.

Now that we have a `TileDto`, it's time to implement the `Repository` interface and
get our hands dirty by interacting with the environment.

```ts
// src/data/TileRepository.mts
import { Tile } from "../domain/Tile.mjs";
import { TileDto } from "./TileDto.mjs";
import { Repository } from "../application/Repository.mjs";

export class TileRepository implements Repository<Tile> {
    get(tile: Tile): TileDto {
        const image = new URL(`./assets/${tile.id}-${tile.size}.png`, import.meta.url);
        return new TileDto(tile.id, tile.size, image);
    }
}
```

Simple enough. We're relying on the tile images existing the `data/assets` directory as `*.png`
files. We're also relying on the tile images being named after their ID and size. So if we want to
get the image for tile 1 of size 64, we'll look for `./assets/1-64.png`. There is no error handling
in this code, but we'll get to that later. Just happy path for now.
Recall the saying, ["Make it work, make it right, make it fast"](https://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast).

Now we'll actually need images to load. I've obtained some from
[opengameart.org](https://opengameart.org/content/topdown-tileset):

![Grass Tile](/scripts/tile-graphics/lesson1/src/data/assets/0-64.png)

![Sand Tile](/scripts/tile-graphics/lesson1/src/data/assets/1-64.png)

![Water Tile](/scripts/tile-graphics/lesson1/src/data/assets/2-64.png)

## The Presentation Layer

We can load a tile with an image, but we still need to render it to the screen. This is where
the `Presenter` comes in. The `Presenter` is responsible for presenting data to the user. In
our case, we'll assume that the `Presenter` is a web browser and that it can render an image
to the screen. We'll also assume that the `Presenter` is a web browser that supports
[ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

```ts
// src/presentation/TilePresenter.mts
import { Presenter } from "../application/Presenter.mjs";
import { TileDto } from "../data/TileDto.mjs";

export class TilePresenter implements Presenter<TileDto> {
    present(tile: Tile) {
        const image = document.createElement("img");
        image.src = tile.image.href;
        document.body.appendChild(image);
    }
}
```
