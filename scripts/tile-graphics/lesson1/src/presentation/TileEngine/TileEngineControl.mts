import { ContainerControl } from "../ContainerControl.mjs";
import { TileEnginePresenter } from "./TileEnginePresenter.mjs";
import { RenderTiles } from "../../application/usecases/RenderTiles.mjs";

export class TileEngineControl extends ContainerControl {
    override accessor presenter = new TileEnginePresenter();
    override accessor useCase = new RenderTiles(
        this.presenter,
        this.children.map(child => child.abstraction)
    );

    start() { this.useCase.execute(); }
}
