export class FindTransferByIdQuery {
  constructor(
    public readonly id: string,
    public readonly loadRelations: boolean,
  ) {}
}

export default FindTransferByIdQuery;