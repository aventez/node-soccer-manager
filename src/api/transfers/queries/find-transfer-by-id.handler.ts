import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TransfersStore } from "../stores/transfers.store";
import Transfer from "../entities/transfer.entity";
import FindTransferByIdQuery from "./find-transfer-by-id.query";

@QueryHandler(FindTransferByIdQuery)
export class FindTransferByIdHandler implements IQueryHandler<FindTransferByIdQuery> {
  constructor(
    private transfersStore: TransfersStore,
  ) {}

  async execute(query: FindTransferByIdQuery): Promise<Transfer> {
    return await this.transfersStore.findByIdOrFail(query.id, query.loadRelations);
  }
}