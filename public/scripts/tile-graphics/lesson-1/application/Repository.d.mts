export interface Repository<E extends {
    id: any;
}> {
    get(id: E['id']): E;
}
