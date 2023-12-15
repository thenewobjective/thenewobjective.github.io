import { Presenter } from "../../application/Presenter.mjs";
import { TileMap } from "../../domain/TileMap.mjs";
export declare class TileMapPresenter implements Presenter<TileMap> {
    elContainer: HTMLElement;
    constructor(elContainer: HTMLElement);
    present({ height, width, tiles }: TileMap): void;
}
