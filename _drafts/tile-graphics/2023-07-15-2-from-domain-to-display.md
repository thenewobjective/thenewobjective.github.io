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

A `Tile` represents an `image` where the `image` represents the tile's
appearance. We have a challenge though, we need to represent the image in a way
that remains agnostic to the display. Within the domain layer, we don't know
anything about how entities are utilized nor do we want to. So we need a
representation that doesn't mention file formats, paths, nor any other environment
related concept. We can use an ID to represent this image though. It can be a string,
number, or any other identifier that can be used uniquely. Since we
expect to have a lot of tiles, a string name seems like a poor choice especially
with similar tiles ("grass1", "grass2", "yellowgrass", etc.). So we'll use a
number.

```ts
// src/domain/Tile.mts
export class Tile {
    constructor(readonly id: number) { }
}
```

## The Use Case

Our first and only use case is to render a tile to the screen. We don't know
what a screen is but luckily, we don't need to. The use case can be defined
via ["Wishful Thinking"](http://wiki.c2.com/?WishfulThinking).

So what is a use case? It's an application of the domain to a specific problem.
It takes the form of either a `Command` or a `Query`. So fittingly, we'll place
our use cases under the `application` directory and begin with defining the
concept of a `UseCase`.

```ts
// src/application/UseCase.mts
export interface UseCase<T, U> {
    execute(input: T): U;
}
```

A Command is a use case that has no return value and has side effects. A Query
is a use case that has no side effects and returns a value.

```ts
// src/application/usecases/RenderTileUseCase.mts
import { Tile } from "../../domain/Tile.mjs";
import { UseCase } from "../UseCase.mjs";
import { Presenter } from "../Presenter.mjs";

export class RenderTileUseCase implements UseCase<number, void> {
    constructor(
        private readonly _presenter: Presenter<any, Tile>
    ) { }

    execute(id: number): void {
        this._presenter.present(new Tile(id));
    }
}

```

We'll require that there is some form of `Presenter` that can render a tile.

```ts
// src/application/Presenter.mts
export abstract class Presenter<C, T> {
    accessor container: C | null;
    constructor() { }

    abstract present(model: T): void;
}
```

The above interfaces represent our requirements for the use case and the contract
that client code must fulfill. In order for someone to use the `RenderTileUseCase`,
they must provide a `Presenter`.

## The Data Layer

We actually need some images to render. So I've obtained some from
[opengameart.org](https://opengameart.org/content/topdown-tileset):

![Grass Tile](/scripts/tile-graphics/lesson1/src/data/assets/0-64.png)

![Sand Tile](/scripts/tile-graphics/lesson1/src/data/assets/1-64.png)

![Water Tile](/scripts/tile-graphics/lesson1/src/data/assets/2-64.png)

These are 64x64 pixel images and will be stored in the `data/assets` directory until
there is a better place for them. By convention, these images are named after their
ID and size. So the image for tile 1 of size 64 is named `1-64.png`. There is more
that can be done here, but we'll just happy path for now.
Recall the saying, ["Make it work, make it right, make it fast"](https://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast).

## The Presentation Layer

Next we tackle the implementation of a `Presenter`. In our case, the
`Presenter` is targeted at a web browser, so we'll use the DOM to render the
tile with a simple `<img>` tag.

```ts
// src/presentation/Presenter.mts
export abstract class Presenter<C, T> {
    accessor container: C;
    constructor(container: C) { this.container = container; }

    abstract present(model: T): void;
}
```

```ts
// src/presentation/TilePresenter.mts
import { Presenter } from "../application/Presenter.mjs";
import { Tile } from "../domain/Tile.mjs";

export class TilePresenter extends Presenter<HTMLElement, Tile> {
    present(tile: Tile): void {
        const img = document.createElement("img");
        img.src = `/data/assets/${tile.id}-64.png`;
        this.container.appendChild(img);
    }
}
```

### Introducing PUC

The Use Case and Presenter are now complete, but we need to wire them together.
This wiring can be accomplished via an "Agent" which is concept adapted from PAC
([Presentation-Abstraction-Control](https://www.dossier-andreas.net/software_architecture/pac.html))
architecture. Think of it like a simplified version of Hierarchical MVC.
A PAC "Agent" is a triad of Presentation, Abstraction, and Control. Since we
are following Clean Architecture, our agent instead will be a PUC triad. The Presenter,
Use Case, and Control. The Control mediates between the Use Case and Presenter.

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
// src/presentation/Control.mts
import { Presenter } from "../application/Presenter.mjs";
import { UseCase } from "../application/UseCase.mjs";

export abstract class Control {
    constructor(children: Control[] = []) {
        children.forEach(child => this.addChild(child));
    }

    accessor parent: Control | null;
    accessor presenter: Presenter<any, any>;
    accessor useCase: UseCase<any, any>;

    #children: Control[] = [];

    get children(): Control[] {
        return this.#children.slice();
    }

    addChild(child: Control): void {
        this.#children.push(child);
        child.parent = this;
    }

    removeChild(child: Control): void {
        const index = this.#children.indexOf(child);
        if (index >= 0) {
            this.#children.splice(index, 1);
            child.parent = null;
        }
    }

    render(): void {
        this.#children.forEach(child => child.render());
    }
}
```

Then the specific control for our use case:

```ts
// src/presentation/TileControl.mts
import { Control } from "./Control.mjs";
import { RenderTileUseCase } from "../application/usecases/RenderTileUseCase.mjs";
import { TilePresenter } from "./TilePresenter.mjs";

export class TileAgent implements Agent {
    #presenter: TilePresenter
    #useCase: RenderTileUseCase

    constructor(
        readonly id: number
    ) {
        this.#presenter = new TilePresenter(container);
        this.#useCase = new RenderTileUseCase(this.#presenter);
    }

    render(): void {
        this.#useCase.execute(this.id);
    }
}
```

### Putting it all together

The final piece is the entry point. This is the code that will be executed
when the page loads. It will encapsulate interaction with the DOM and
attach one or agents to the page. We'll use a simple `ApplicationAgent` to
represent this.

```ts
// src/presentation/ApplicationAgent.mts
import { Agent } from "./Agent.mjs";

export class ApplicationAgent {
    #container: HTMLElement = document.documentElement

    constructor(
        readonly children: Agent[]
    ) { }

    run(): void {
        this.children.forEach(child => child.render());
    }
}
```

And now the top level entry point:

```ts
// src/index.mts
import { ApplicationAgent } from "./presentation/ApplicationAgent.mjs";
import { TileAgent } from "./presentation/TileAgent.mjs";

const app = new ApplicationAgent([
    new TileAgent(0),
    new TileAgent(1),
    new TileAgent(2),
]);
```

## Infrastructure Layer
