import { Repository } from "../application/Repository.mjs";
import { TileMap } from "../domain/TileMap.mjs";
export declare class TileMapRepository implements Repository<TileMap> {
    #private;
    get(id: string): Promise<TileMap>;
}
