import { Entity } from "../domain/Entity.mjs";

export interface Repository<K, V extends Entity<K>> {
    get(id: K): V;
}
