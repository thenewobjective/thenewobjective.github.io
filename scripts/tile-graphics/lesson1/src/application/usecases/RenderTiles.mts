import { Tile } from "../../domain/Tile.mjs";
import { UseCase } from "../UseCase.mjs";
import { Presenter } from "../Presenter.mjs";

export class RenderTiles implements UseCase<unknown, void> {
    constructor(
        readonly presenter: Presenter<Tile>,
        readonly tiles: Tile[]
    ) { }

    execute(): void {
        this.tiles.forEach(tile => this.presenter.present(tile));
    }
}
