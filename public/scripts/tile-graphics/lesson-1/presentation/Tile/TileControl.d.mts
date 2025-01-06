import { Control } from "../../application/Control.mjs";
import { RenderTile } from "../../application/usecases/RenderTile.mjs";
import { TileRepository } from "../../data/TileRepository.mjs";
import { TilePresenter } from "./TilePresenter.mjs";
export declare class TileControl extends Control {
    readonly id: number;
    accessor presenter: TilePresenter;
    accessor repository: TileRepository;
    accessor useCase: RenderTile;
    constructor(id: number);
    render(): void;
}
