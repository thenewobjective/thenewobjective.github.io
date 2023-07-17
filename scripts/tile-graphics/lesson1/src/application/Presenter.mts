export abstract class Presenter<T> {
    accessor parent: Presenter<any> | null;
    abstract present(model: T): void;
}
