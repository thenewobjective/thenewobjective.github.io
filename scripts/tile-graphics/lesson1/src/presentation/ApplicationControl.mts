import { Presenter } from "../application/Presenter.mjs";
import { Control } from "./Control.mjs";

class ApplicationPresenter extends Presenter<any> {

}

export class ApplicationControl extends Control {
    override accessor presenter = new ApplicationPresenter()

    start(): void {
        this.render();
    }
}
