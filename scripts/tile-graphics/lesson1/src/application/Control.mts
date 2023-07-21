import { Presenter } from "./Presenter.mjs";
import { UseCase } from "./UseCase.mjs";
import { ContainerControl } from "../presentation/ContainerControl.mjs";

export abstract class Control<A> {
    accessor parent: ContainerControl | null;
    accessor presenter: Presenter<any> | null;
    accessor abstraction: A
    accessor useCase: UseCase<any, any> | null;
}
