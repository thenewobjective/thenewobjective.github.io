export abstract class Entity<K> {
    constructor(readonly id: K) { }

    equals(other: Entity<K>): boolean {
        return this.id === other.id;
    }
}
