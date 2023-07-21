import { Control } from "../application/Control.mjs";

export abstract class ContainerControl extends Control<void> {
    #children: Control<any>[] = [];

    constructor(...children: Control<any>[]) {
        super()
        children.forEach(child => this.addChild(child));
    }

    get children(): Control<any>[] {
        return this.#children.slice();
    }

    addChild(child: Control<any>): void {
        this.#children.push(child);
        child.parent = this;
    }

    removeChild(child: Control<any>): void {
        const index = this.#children.indexOf(child);
        if (index >= 0) {
            this.#children.splice(index, 1);
            child.parent = null;
        }
    }
}
