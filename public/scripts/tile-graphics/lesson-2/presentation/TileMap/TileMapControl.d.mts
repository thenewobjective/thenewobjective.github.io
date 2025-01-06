import { Control } from "../../application/Control.mjs";
import { LoadTileMap } from "../../application/usecases/LoadTileMap.mjs";
import { TileMapRepository } from "../../data/TileMapRepository.mjs";
import { TileMapPresenter } from "./TileMapPresenter.mjs";
export declare class TileMapControl extends Control {
    readonly mapId: string;
    accessor presenter: TileMapPresenter;
    accessor repository: TileMapRepository;
    accessor useCase: LoadTileMap;
    constructor(mapId: string);
    render(): void;
}
