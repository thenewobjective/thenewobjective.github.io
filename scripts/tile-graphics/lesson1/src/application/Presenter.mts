export abstract class Presenter<T> {
    abstract present(model: T): void;
}
