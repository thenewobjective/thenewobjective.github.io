import { ContainerControl } from "../ContainerControl.mjs";
import { TileEnginePresenter } from "./TileEnginePresenter.mjs";
import { UseCase } from "../../application/UseCase.mjs";
import { Presenter } from "../../application/Presenter.mjs";

class RenderChildrenUseCase implements UseCase<unknown, void> {
    constructor(
        readonly presenter: Presenter<unknown>,
        readonly children: unknown[]
    ) { }

    execute(): void {
        this.children.forEach(child => {
            this.presenter.present(child);
        })
    }
}

export class TileEngineControl extends ContainerControl {
    override accessor presenter = new TileEnginePresenter();
    override accessor useCase = new RenderChildrenUseCase(this.presenter, this.children);

    start(): void {
        this.useCase.execute();
    }
}
