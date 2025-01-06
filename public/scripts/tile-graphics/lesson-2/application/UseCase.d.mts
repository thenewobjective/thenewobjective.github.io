export interface UseCase<T, U> {
    execute(input: T): U;
}
export interface Command<T> extends UseCase<T, void> {
}
export interface Query<T> extends UseCase<void, T> {
}
