import { Presenter } from "../Presenter.mjs";
import { Repository } from "../Repository.mjs";
import { TileDto } from "../models/TileDto.mjs";

export class RenderTileUseCase {
    constructor(
        private readonly _presenter: Presenter<TileDto>,
        private readonly _repository: Repository<number, TileDto>
    ) { }

    execute(id: number, size: number): void {
        const tileDto = this._repository.get(id);
        this._presenter.present(tileDto);
    }
}
