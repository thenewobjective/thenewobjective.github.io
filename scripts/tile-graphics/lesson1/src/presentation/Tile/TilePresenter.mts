import { Presenter } from "../../application/Presenter.mjs";
import { Tile } from "../../domain/Tile.mjs";

export class TilePresenter extends Presenter<Tile> {
    constructor(readonly container: HTMLElement) {
        super()
    }
    present(tile: Tile): void {
        const img = document.createElement("img");
        img.src = `/data/assets/${tile.id}-64.png`;
        this.container.appendChild(img);
    }
}
