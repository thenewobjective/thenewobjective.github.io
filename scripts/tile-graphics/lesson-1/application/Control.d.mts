import { Presenter } from "./Presenter.mjs";
import { UseCase } from "./UseCase.mjs";
import { Repository } from "./Repository.mjs";
export declare abstract class Control {
    accessor presenter: Presenter<any> | undefined;
    accessor repository: Repository<any> | undefined;
    accessor useCase: UseCase<any, any> | undefined;
    abstract render(): void;
}
