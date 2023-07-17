// src/data/TileRepository.mts
import { Tile } from "../domain/Tile.mjs";
import { TileDto } from "../application/models/TileDto.mjs";
import { Repository } from "../application/Repository.mjs";

export class TileRepository implements Repository<Tile> {
    get(tile: Tile): TileDto {
        const image = new URL(`./assets/${tile.id}.png`, import.meta.url);
        return new TileDto(tile.id, tile.size, image);
    }
}
