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
