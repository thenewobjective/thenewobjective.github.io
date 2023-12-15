import { Repository } from "../application/Repository.mjs";
import { Tile } from "../domain/Tile.mjs";
export declare class TileRepository implements Repository<Tile> {
    get(id: number): Tile;
}
