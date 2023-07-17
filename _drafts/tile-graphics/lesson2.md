
<!-- ### Value Objects and Entities

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
it is no longer the same. -->

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
