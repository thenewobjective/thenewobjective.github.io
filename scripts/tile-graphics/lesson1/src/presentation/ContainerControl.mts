import { Control } from "./Control.mjs";

export abstract class ContainerControl extends Control {
    #children: Control[] = [];

    constructor(...children: Control[]) {
        super()
        children.forEach(child => this.addChild(child));
    }

    get children(): Control[] {
        return this.#children.slice();
    }

    addChild(child: Control): void {
        this.#children.push(child);
        child.parent = this;
    }

    removeChild(child: Control): void {
        const index = this.#children.indexOf(child);
        if (index >= 0) {
            this.#children.splice(index, 1);
            child.parent = null;
        }
    }
}
