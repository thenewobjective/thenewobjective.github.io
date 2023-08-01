import { Presenter } from "../../application/Presenter.mjs";
import { Tile } from "../../domain/Tile.mjs";
export declare class TilePresenter implements Presenter<Tile> {
    elContainer: HTMLElement;
    constructor(elContainer: HTMLElement);
    present({ id, size, url }: Tile): void;
}
