import { Presenter } from "../application/Presenter.mjs";
import { UseCase } from "../application/UseCase.mjs";

export abstract class Control {
    constructor(children: Control[] = []) {
        children.forEach(child => this.addChild(child));
    }

    accessor presenter: Presenter<any>;
    accessor useCase: UseCase<any, any>;

    #children: Control[] = [];
    #parent: Control | null;

    get parent(): Control | null {
        return this.#parent;
    }

    get children(): Control[] {
        return this.#children.slice();
    }

    addChild(child: Control): void {
        this.#children.push(child);
        child.#parent = this;
        child.presenter.parent = this.presenter;
    }

    removeChild(child: Control): void {
        const index = this.#children.indexOf(child);
        if (index >= 0) {
            this.#children.splice(index, 1);
            child.#parent = null;
            child.presenter.parent = null;
        }
    }

    render(): void {
        this.#children.forEach(child => child.render());
    }
}
