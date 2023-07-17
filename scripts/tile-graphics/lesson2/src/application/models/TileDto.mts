import { Tile } from "../../domain/Tile.mjs";

export class TileDto extends Tile {
    constructor(
        readonly id: number,
        readonly size: number,
        readonly image: URL
    ) {
        super(id, size);
    }
}
