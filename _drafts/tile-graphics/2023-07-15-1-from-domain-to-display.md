---
layout: post
icon: file-text
category: Tile Graphics
title:  "1 - From Domain to Display"
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

The use cases are the activities that the project needs to perform for the user.
In this case, we need to be able to render a tile to the screen. This is a very simple
use case, but it is a good starting point.

## The Domain

A `Tile` represents an image of a specific size. This domain entity must remain
agnostic to its usage, so we don't want to mention anything about the display
or any other environment related concept such as file formats.

```ts
// src/domain/Tile.mts
export class Tile {
    constructor(
        readonly id: number,
        readonly size: number,
        readonly url: string
    ) { }
}
```

We can use an ID to represent this tile. It can be a string,
number, or any other unique key. Since we expect to have a lot of tiles,
a string name seems like a [poor choice](https://www.karlton.org/2017/12/naming-things-hard/)
especially with similar tiles ("grass1", "grass2", "yellowgrass", etc.). So we'll use a
number. The `size` is the width and height of the tile in pixels, and the `url` is the
location of the image data.

## The Use Case

Our first and only use case is to render a tile to the screen. We don't know
what a screen is but luckily, we don't need to. The use case can be defined
via ["Wishful Thinking"](http://wiki.c2.com/?WishfulThinking).

So what is a use case? It's an application of the domain to a specific problem.
It takes the form of either a `Command` or a `Query`. So fittingly, we'll place
our use cases under the `application` directory and begin with defining these
concepts:

```ts
// src/application/UseCase.mts
export interface UseCase<T, U> {
    execute(input: T): U;
}

export interface Command<T> extends UseCase<T, void> { }

export interface Query<T> extends UseCase<void, T> { }
```

A `Command` is a use case that has no return value and has side effects. A `Query`
is a use case that has no side effects and returns a value. This represents
the principle of ["Command-Query Separation"](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation).

Now for the use case itself:

```ts
// src/application/usecases/RenderTile.mts
import { Tile } from "../../domain/Tile.mjs";
import { Command } from "../UseCase.mjs";
import { Presenter } from "../Presenter.mjs";
import { Repository } from "../Repository.mjs";

export class RenderTile implements Command<number> {
    constructor(
        readonly presenter: Presenter<Tile>,
        readonly repository: Repository<Tile>
    ) { }

    execute(id: number): void {
        const tile = this.repository.get(id);
        this.presenter.present(tile);
    }
}
```

Rendering a tile consists of two steps: loading the tile, and then
presenting it. A use case doesn't need to know how to perform either of these
steps, it just needs to know that they can be done. So we'll define the
requirements for these steps as interfaces.

```ts
// src/application/Presenter.mts
export interface Presenter<T> {
    present(model: T): void;
}
```

A `Presenter` is trivially simple. It takes a model and presents it.

```ts
// src/application/Repository.mts
export interface Repository<E extends { id: any }> {
    get(id: E['id']): E;
}
```

Similarly, a `Repository` is also simple. It takes an ID and returns the associated entity.
There are other methods that can be added to this interface, but we'll keep it
simple for now ([YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)).

## The Data Layer

We actually need some images to render. So I've obtained some from
[opengameart.org](https://opengameart.org/content/topdown-tileset):

![Grass Tile](/scripts/tile-graphics/lesson-1/849c6086a07317cf94cb.png)

![Sand Tile](/scripts/tile-graphics/lesson-1/dad55d91b8d6b946af31.png)

![Water Tile](/scripts/tile-graphics/lesson-1/6db2be0f09ca0cbfa1e2.png)

These are 64x64 pixel images and will be stored in the `src/data/assets` directory until
there is a better place for them. By convention, these images are named after their
ID and size. So the image for tile 1 of size 64 is named `1-64.png`. There is more
that can be done here, but we'll just happy path for now.
Recall the saying, ["Make it work, make it right, make it fast"](https://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast).

To load these images, we'll define a `TileRepository`:

```ts
// src/data/TileRepository.mts
import { Repository } from "../application/Repository.mjs";
import { Tile } from "../domain/Tile.mjs";

export class TileRepository implements Repository<Tile> {
    get(id: number): Tile {
        const size = 64,
            url = require(`./assets/${id}-${size}.png`)
        return new Tile(id, size, url);
    }
}
```

## The Presentation Layer

Next we tackle the implementation of a `Presenter`. In our case, the
`Presenter` is targeted at a web browser, so we'll use the DOM to render the
tile with a simple `<img>` tag:

```ts
// src/presentation/Tile/TilePresenter.mts
import { Presenter } from "../../application/Presenter.mjs";
import { Tile } from "../../domain/Tile.mjs";

export class TilePresenter implements Presenter<Tile> {
    constructor(public elContainer: HTMLElement) { }

    present({ id, size, url }: Tile): void {
        const htmlTile = Object.assign(document.createElement('img'), {
            src: url,
            width: size,
            height: size,
            alt: `tile ${id}`
        });
        this.elContainer.appendChild(htmlTile);
    }
}
```

### Introducing PUC

The Use Case, Repository, and Presenter are now complete, but we need something
to control and connect them. Additionally, we need to connect the Presenter to the
DOM and specify the tile we want to render.

This wiring can be accomplished via an "Agent" which is concept adapted from PAC
([Presentation-Abstraction-Control](https://www.dossier-andreas.net/software_architecture/pac.html))
architecture. Think of it like a simplified version of Hierarchical MVC.
A PAC "Agent" is a triad of Presentation, Abstraction, and Control. Since we
are following Clean Architecture, our agent instead will be a PUC triad. The Presenter,
Use Case, and Control. The Control acts as a mediator.

<figure markdown="1">

![PUC Agent](https://mermaid.ink/img/pako:eNplkM1ugzAQhF_F2rOJsIEQfKuS3FKp6s-l8sXFmwQ12MgYqSni3WtIXFXqbWb2m5W9I9RWIwg4OdWdyetOOmkIIf3wcUseTmj8PdSNw9o31pDD8z0iTw77QKCLwdYa7-wl2rcet6rH2f6rkCRJIr_oP3Dg0OhZAYUWXasaHZ45zhMJ_owtShBBauU-JUgzBW7otPK41423DsRRXXqkoAZvX66mBuHdgBHaNSp8sP2lcCk93o6x3IRCp8y7tW0sBgtihC8QrFhtNmWe8TTP8oqzqqRwBcGzapUWLOMlK9I1z9YThe9lAZt-AG9Uc0Q?type=png)

<figcaption>PUC Agent</figcaption>
</figure>

These agents can be composed into a hierarchy, like the DOM:

<figure markdown="1">

![PUC Agent Hierarchy](https://mermaid.ink/img/pako:eNqVk1FPwjAUhf_Kcp8H2VrZoG8KvmliFF-0PlR6hUXWkq5LRMJ_t50rDo0j7OnenXPu-rXrDhZaIjBYGrFZRfMZN1zJwuDCFlpF8yvfV_Xrt3y5RGXTZw5NweHFq5F7fhI39-HdncHKudD4wKHphKZaWaPXXm7LjvhY4VRU6MW2bMW_46PBYHAY1jQh7L2oZIgdc5BzOUg_B-njIKc5SJeDdDlI8LYsxxz0XA7az0H7OOhpDtrloF0O-us8js4sgP8nUIihRFOKQrrfdec_ysGusHQLYa6Uwrxz4GrvfPVGCovXsrDaAHsT6wpjELXVD1u1AGZNjcE0K4Tby_LgwiZ0-30pmrsRw0aoJ63LEHQtsB18AKPJMB2Ps5QSOrlI0mSSxbAFliVD14xIPsomOc1zso_hsxmQ7r8AbNYi5Q?type=png)

<figcaption>PUC Agent Hierarchy</figcaption>
</figure>

We've already defined a Presenter and Use Case, so we just need to define the Control.

```ts
// src/application/Control.mts
import { Presenter } from "./Presenter.mjs";
import { UseCase } from "./UseCase.mjs";
import { Repository } from "./Repository.mjs";

export abstract class Control {
    accessor presenter: Presenter<any> | undefined
    accessor repository: Repository<any> | undefined
    accessor useCase: UseCase<any, any> | undefined

    abstract render(): void
}
```

The Control is basically a container for the Presenter, Use Case, and Repository.
It also defines a `render` method that will trigger the use case.

Here's the specific control for our use case:

```ts
// src/presentation/Tile/TileControl.mts
import { Control } from "../../application/Control.mjs";
import { RenderTile } from "../../application/usecases/RenderTile.mjs";
import { TileRepository } from "../../data/TileRepository.mjs";
import { TilePresenter } from "./TilePresenter.mjs";

export class TileControl extends Control {
    override accessor presenter = new TilePresenter(document.body);
    override accessor repository = new TileRepository();
    override accessor useCase = new RenderTile(this.presenter, this.repository);

    constructor(readonly id: number) { super() }

    render() { this.useCase.execute(this.id); }
}
```

You'll notice that the `TileControl` and `TilePresenter` are sibling files since
they are logically related.

### Putting it all together

The final piece is the entry point. This is the code that will be executed
when the page loads.

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

The [build system](https://github.com/mlhaufe/tile-engine/tree/v0.0.0) will take
care of compiling the TypeScript code into JavaScript and generating the HTML file.

## Demo

That's it! We've successfully rendered some tiles to the screen:

<iframe src="/scripts/tile-graphics/lesson-1" width="640px" height="320px"></iframe>

This was probably more work than you expected since each layer of the architecture
had to be introduced first. But now that the structure is in place, future work
will be more straightforward as it will follow the same pattern.

The code for this lesson can be found [here](https://github.com/mlhaufe/tile-engine/tree/v0.1.0)
