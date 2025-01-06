import { Command } from "../UseCase.mjs";
import { Presenter } from "../Presenter.mjs";
import { Repository } from "../Repository.mjs";
import { TileMap } from "../../domain/TileMap.mjs";
export declare class LoadTileMap implements Command<string> {
    readonly presenter: Presenter<TileMap>;
    readonly repository: Repository<TileMap>;
    constructor(presenter: Presenter<TileMap>, repository: Repository<TileMap>);
    execute(id: string): Promise<void>;
}
