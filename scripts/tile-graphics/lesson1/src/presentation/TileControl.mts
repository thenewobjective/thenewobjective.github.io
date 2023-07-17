import { Control } from "./Control.mjs";
import { RenderTileUseCase } from "../application/usecases/RenderTileUseCase.mjs";
import { TilePresenter } from "./TilePresenter.mjs";

export class TileControl extends Control {
    #useCase: RenderTileUseCase

    constructor(
        readonly id: number
    ) {
        super();
        this.presenter = new TilePresenter();
        this.#useCase = new RenderTileUseCase(this.presenter);
    }

    render(): void {
        this.#useCase.execute(this.id);
    }
}
