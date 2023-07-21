import { Control } from "../../application/Control.mjs";
import { Tile } from "../../domain/Tile.mjs";

export class TileControl extends Control<Tile> {
    constructor(id: number, size: number) {
        super()
        this.abstraction = new Tile(id, size);
    }
}
