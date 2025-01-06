export interface Presenter<T> {
    present(model: T): void;
}
