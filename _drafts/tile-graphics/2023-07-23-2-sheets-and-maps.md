---
layout: post
icon: file-text
category: Tile Graphics
title:  "2. Sheets and Maps"
date:   2023-07-23 12:00:00 -0600
permalink: /tile-graphics/sheets-and-maps/
---

In the previous lesson we have the following index file:

```ts
// src/index.mts
import { TileControl } from "./presentation/Tile/TileControl.mjs";

const tiles = [
    new TileControl(0),
    new TileControl(1),
    new TileControl(2)
]

tiles.forEach(tile => tile.render())
```

This form hints at a missing use case. In the above we're wanting to display
a collection of related tiles. It's common to want to load such a collection
sharing a common theme. For example, a snow level, a desert level, etc.
In this lesson we'll explore how load and manage such collections.

## Tile Maps

We'll continue a [Use-Case-Driven](http://www.perflensburg.se/Privatsida/cp-web/hsijudrv.htm)
approach to development. The use case for this lesson is to load and present a
collection of tiles representing a "level" or "map":

```ts
// src/application/usecase/LoadTileMap.mts
import { Command } from "../UseCase.mjs";
import { Presenter } from "../Presenter.mjs";
import { Repository } from "../Repository.mjs";
import { TileMap } from "../../domain/TileMap.mjs";

export class LoadTileMap implements Command<string> {
    constructor(
        readonly presenter: Presenter<TileMap>,
        readonly repository: Repository<TileMap>
    ) { }

    async execute(id: string): Promise<void> {
        const tileMap = await this.repository.get(id);
        this.presenter.present(tileMap);
    }
}
```

Like the `RenderTile` use case, this one is also straightforward
and declared via wishful thinking, in other words, we're using
objects that don't exist yet but want to. In this case, we're assuming
the existence of a `TileMap` entity and demanding that the `Repository`
and `Presenter` interfaces be implemented by the caller to support our
desired usage.

So what is a `TileMap` precisely? It's a collection of tiles arranged
arbitrarily in a grid of a given size. These tiles are all constrained to
common dimensions and theme via an associated `tileSheet`:

```ts
// src/domain/TileMap.mts
import { Tile } from "./Tile.mjs";
import { TileSheet } from "./TileSheet.mjs";

export class TileMap {
    constructor(
        readonly id: string,
        readonly width: number,
        readonly height: number,
        readonly tileSheet: TileSheet,
        readonly tiles: Tile[][]
    ) {
        const ts = tiles.flat();
        if (ts.length < 1)
            throw new Error("TileMap must have at least one tile");
        if (ts.some(tile => !tileSheet.tiles.includes(tile)))
            throw new Error("TileMap cannot contain tiles not in its tileSheet");
        if (ts.length !== width * height)
            throw new Error("TileMap must have width * height tiles");
    }
}
```

The `tileSheet` is the collection that contains all possible tiles for this map. The `tiles`
are the specific instances that we want to use arranged in a grid (2D array).
The constructor has some checks to ensure the `TileMap` is valid, in other
words "Correct by Construction" by making an illegal state unrepresentable.

Moving on to the repository, we can tackle the loading of a `TileMap`:

```ts
// src/data/repository/TileMapRepository.mts
import { Repository } from "../application/Repository.mjs";
import { TileMap } from "../domain/TileMap.mjs";
import { TileSheetRepository } from "./TileSheetRepository.mjs";

interface TileMapDto {
    id: string;
    width: number;
    height: number;
    tileSheetId: string;
    tileIds: number[][];
}

export class TileMapRepository implements Repository<TileMap> {
    #tileSheetRepository = new TileSheetRepository();
    async get(id: string): Promise<TileMap> {
        const json = require(`./assets/maps/${id}.json`) as TileMapDto,
            { width, height, tileSheetId, tileIds } = json,
            tileSheet = await this.#tileSheetRepository.get(tileSheetId),
            tiles = tileIds.map(row => row.map(id => tileSheet.tiles[id])),
            tileMap = new TileMap(id, width, height, tileSheet, tiles);

        return tileMap;
    }
}
```

In order to load a `TileMap`, we must define the serialization format for it.
We'll use JSON for this purpose. In the `TileMap` entity, references to other
entities are used directly. For storage, we'll use the `id` property of those
references instead. You can see this in the `TileMapDto` interface which
mirrors the `TileMap` entity.

A "DTO" is an initialism for "Data Transfer Object". It is a data structure
used to transfer data between software systems. In this case,
we're using it to transfer data between Data Layer and a storage medium
such as a file system.

An example JSON serialization for a map might look like this:

```json
{
    "id": "sample-1",
    "width": 10,
    "height": 10,
    "tileSheetId": "default",
    "tileIds": [
        [12,   0,   0,   0,    0,  0 ,   0,   0,   0, 12],
        [12,   76,  76,  76,  76,  76,  76,  76,  76, 12],
        [12,   76,  76,  76,  76,  76,  76,  76,  76, 12],
        [12,   76,  76,  76,  76,  76,  76,  76,  76, 12],
        [12,   76,  76,  76,  76,  55,  76,  76,  76, 12],
        [12,   76,  76,  76,  55,  55,  55,  76,  76, 12],
        [12,   76,  76,  76,  76,  76,  76,  76,  76, 12],
        [12,   76,  76,  76,  76,  76,  76,  76,  76, 12],
        [12,   76,  76,  76,  76,  76,  76,  76,  76, 12],
        [115, 103, 103, 103, 103, 103, 103, 103, 103, 91]
    ]
}
```

These serialized maps can be stored in the `assets/maps` folder.

## Tile Sheets

With the `TileMap` defined, we now need to determine in detail what a `TileSheet` is.
From the usage of the `TileMap` we've dictated that it must contain a collection
of `tiles`, and that these tiles must share a common set of dimensions and theme.

```ts
// src/domain/TileSheet.mts
import { Tile } from "./Tile.mjs";

export class TileSheet {
    constructor(
        readonly id: string,
        readonly tileSize: number,
        readonly tiles: Tile[]
    ) { }
}
```

As usual, there is an `id` to uniquely identify our domain entity.

The `TileMapRepository` will need to load a `TileSheet` in order to load a `TileMap`.
As such, we'll need a `TileSheetRepository` but before we can define that, we should
pause for a moment and revisit how `Tile` is defined and loaded. Recall in the previous
lesson, a `Tile` is associated with an image in a folder. Each time the tile is rendered,
it would have to load that image for display. This is a very inefficient way to handle
tiles when we have many of them. Additionally, that approach would tempt us to satisfy
the theme requirement by placing tiles collections in folders. It would be better to make
this grouping a first-class concept and fill two needs with one deed. The `TileSheet`
entity serves this purpose, but how is this represented on disk with its associated images?

Instead of a folder, we'll use a single image to represent a collection of related
tiles where each is a sub-image of the sheet organized in a grid. Since
each tile is a relatively small image, we can load the entire sheet once and
then extract the sub-images as needed.

The tiles are arranged in a grid, with each being
the same size. Here is a tile sheet adapted from
[OpenGameArt.org](https://opengameart.org/content/platformer-art-deluxe):

<figure markdown="1">

![Tile Sheet](/media-library/tile-graphics/default-70.png)

</figure>

The image will be stored under `src\data\assets\sheets` following the naming
convention of `{id}-{tileSize}.png`. In this case, the image is stored as
`default-70.png` as the size of each tile is 70 pixels and the ID is arbitrarily
set as `default`.

The old tiles and containing folder from lesson 1 can be deleted as they are no longer needed:

- `src\data\assets\tiles\0-64.png`
- `src\data\assets\tiles\1-64.png`
- `src\data\assets\tiles\2-64.png`

We'll need to adjust the `Tile` entity to leverage the new `TileSheet` approach
instead of the old `url` property:

```ts
// src/domain/Tile.mts
export class Tile {
    constructor(
        readonly id: number,
        readonly size: number,
        readonly image: ImageBitmap
    ) { }
}
```

Instead of a `url`, the `Tile` now has an `image` property. This is an
`ImageBitmap` which represents the image data for the tile.

Now we can implement the `TileSheetRepository`:

```ts
// src/data/TileSheetRepository.mts
import { TileSheet } from "../domain/TileSheet.mjs";
import { Repository } from "../application/Repository.mjs";
import { Tile } from "../domain/Tile.mjs";

export class TileSheetRepository implements Repository<TileSheet> {
    accessor defaultTileSize: number = 70;

    async #loadTiles(size: number, url: string) {
        const response = await fetch(url),
            blob = await response.blob(),
            image = await createImageBitmap(blob),
            { width, height } = image,
            tiles = await Promise.all(
                Array.from({ length: width / size * height / size }, async (_, i) => {
                    const x = i % (width / size) * size,
                        y = Math.floor(i / (width / size)) * size,
                        img = await createImageBitmap(image, x, y, size, size);
                    return new Tile(i, size, img)
                })
            )
        image.close(); // No need to keep the image in memory after we've created the tiles
        return tiles
    }

    async get(id: string) {
        const size = this.defaultTileSize,
            url = require(`./assets/sheets/${id}-${size}.png`),
            tiles = await this.#loadTiles(size, url);
        return new TileSheet(id, size, tiles)
    }

    async getBySize(id: string, size: number) {
        const url = require(`./assets/sheets/${id}-${size}.png`),
            tiles = await this.#loadTiles(size, url);
        return new TileSheet(id, size, tiles)
    }
}
```

The `TileSheetRepository` has two methods: `get` and `getBySize`.
The `get` method loads the tile sheet with a default tile size to
satisfy the `Repository` interface. It can also be the most common use case
since multiple tile sheets generally share the same tile size in a particular
game. The `getBySize` method allows for a specific tile size to be specified
for the exceptional cases.

The `#loadTiles` method is where the magic happens. It loads the image
and creates the tiles by walking the grid and creating a tile for each.
This process is asynchronous, so the method is marked as such. This implies
that the `Repository` interface should be updated to reflect this by making the
`get` method return a `Promise`:

```ts
// src/application/Repository.mts
export interface Repository<E extends { id: any }> {
    get(id: E['id']): Promise<E>;
}
```

So what happens to the `TileRepository` from lesson 1? It's no longer needed. The `TileSheet`
entity now contains all the information needed. The `TileRepository`
can be deleted.

## Putting it all together

The new use case is now complete. Now it's time to put it all together and
see it in action. We'll define a new agent:

```ts
// src/presentation/TileMap/TileMapControl.mts
import { Control } from "../../application/Control.mjs";
import { LoadTileMap } from "../../application/usecases/LoadTileMap.mjs";
import { TileMapRepository } from "../../data/TileMapRepository.mjs";
import { TileMapPresenter } from "./TileMapPresenter.mjs";

export class TileMapControl extends Control {
    override accessor presenter = new TileMapPresenter(document.body);
    override accessor repository = new TileMapRepository();
    override accessor useCase = new LoadTileMap(this.presenter, this.repository);

    constructor(readonly mapId: string) { super() }

    render() { this.useCase.execute(this.mapId); }
}
```

As before, the `TileMapControl` acts as the [mediator](https://en.wikipedia.org/wiki/Mediator_pattern)
between the presenter, repository, and use case. The `TileMapControl` is instantiated with the ID
of the tile map to load. The `render` method does the magic of executing the use case when
needed.

The last part of the agent is the presenter:

```ts
// src/presentation/TileMap/TileMapPresenter.mts
import { Presenter } from "../../application/Presenter.mjs";
import { TileMap } from "../../domain/TileMap.mjs";

export class TileMapPresenter implements Presenter<TileMap> {
    constructor(public elContainer: HTMLElement) { }

    present({ height, width, tiles }: TileMap): void {
        const canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d")!,
            tileSize = tiles[0][0].size;

        Object.assign(canvas, {
            width: width * tileSize,
            height: height * tileSize
        });

        tiles.forEach((row, y) =>
            row.forEach(({ image }, x) =>
                ctx.drawImage(image, x * tileSize, y * tileSize)
            )
        )

        this.elContainer.appendChild(canvas);
    }
}
```

Since a tile uses an `ImageBitmap` instead of a URL, the `TileMapPresenter` can
now draw the tiles directly to a canvas element in bulk for display.

The old `TileControl` and `TilePresenter` can now be deleted as they are no longer needed.

Our new agent is now complete. We can now use it in our `index.ts`:

```ts
// src/index.ts
import { TileMapControl } from "./presentation/TileMap/TileMapControl.mjs";

const sampleMap = new TileMapControl('sample-1');

sampleMap.render();
```

## Demo

Time to see it in action:

<iframe src="/scripts/tile-graphics/lesson-2" width="720px" height="720px"></iframe>

We now have support for tile maps and sheets. Creating and editing tile maps can be tedious,
so in the next lesson we'll look at how to create a tile map editor to make the process easier.

The code for this lesson can be found [here](https://github.com/mlhaufe/tile-engine/tree/v0.2.0)
