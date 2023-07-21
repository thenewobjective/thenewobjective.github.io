import { RenderTileUseCase } from "../../application/usecases/RenderTileUseCase.mjs";
import { Control } from "../Control.mjs";
import { TilePresenter } from "./TilePresenter.mjs";

export class TileControl extends Control {
    override accessor presenter = new TilePresenter();
    override accessor useCase = new RenderTileUseCase(this.presenter);

    constructor(readonly id: number) { super() }
}
