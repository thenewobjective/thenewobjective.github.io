export interface Presenter<T> {
    present(entity: T): void;
}
