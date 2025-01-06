import { Tile } from "../../domain/Tile.mjs";
import { Command } from "../UseCase.mjs";
import { Presenter } from "../Presenter.mjs";
import { Repository } from "../Repository.mjs";
export declare class RenderTile implements Command<number> {
    readonly presenter: Presenter<Tile>;
    readonly repository: Repository<Tile>;
    constructor(presenter: Presenter<Tile>, repository: Repository<Tile>);
    execute(id: number): Promise<void>;
}
