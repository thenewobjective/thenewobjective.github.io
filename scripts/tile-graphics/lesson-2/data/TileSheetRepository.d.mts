import { TileSheet } from "../domain/TileSheet.mjs";
import { Repository } from "../application/Repository.mjs";
export declare class TileSheetRepository implements Repository<TileSheet> {
    #private;
    accessor defaultTileSize: number;
    get(id: string): Promise<TileSheet>;
    getBySize(id: string, size: number): Promise<TileSheet>;
}
