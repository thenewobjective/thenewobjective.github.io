import { Entity } from "./Entity.mjs";

export class Tile extends Entity<number> {
    constructor(
        readonly id: number,
        readonly size: number
    ) { super(id); }
}
