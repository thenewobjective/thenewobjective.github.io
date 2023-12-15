import { Tile } from "./Tile.mjs";
import { TileSheet } from "./TileSheet.mjs";
export declare class TileMap {
    readonly id: string;
    readonly width: number;
    readonly height: number;
    readonly tileSheet: TileSheet;
    readonly tiles: Tile[][];
    constructor(id: string, width: number, height: number, tileSheet: TileSheet, tiles: Tile[][]);
}
