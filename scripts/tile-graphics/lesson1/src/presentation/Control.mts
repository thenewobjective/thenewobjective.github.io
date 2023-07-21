import { Presenter } from "../application/Presenter.mjs";
import { UseCase } from "../application/UseCase.mjs";
import { ContainerControl } from "./ContainerControl.mjs";

export abstract class Control {
    accessor parent: ContainerControl | null;
    accessor presenter: Presenter<any> | null;
    accessor useCase: UseCase<any, any> | null;
}
