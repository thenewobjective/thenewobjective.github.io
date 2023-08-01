import { Tile } from "./Tile.mjs";
export declare class TileSheet {
    readonly id: string;
    readonly tileSize: number;
    readonly tiles: Tile[];
    constructor(id: string, tileSize: number, tiles: Tile[]);
}
