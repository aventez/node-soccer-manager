export class FindPlayerByIdQuery {
  constructor(
    public readonly id: string,
    public readonly loadRelations: boolean,
  ) {}
}