export interface IEntityStore<TEntity> {
  findById(id: string): Promise<TEntity | null>;
  findByIdOrFail(id: string): Promise<TEntity>;
}