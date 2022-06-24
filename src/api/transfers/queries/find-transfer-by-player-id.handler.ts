import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TransfersStore } from "../stores/transfers.store";
import Transfer from "../entities/transfer.entity";
import FindTransferByPlayerIdQuery from "./find-transfer-by-player-id.query";

@QueryHandler(FindTransferByPlayerIdQuery)
export class FindTransferByPlayerIdHandler implements IQueryHandler<FindTransferByPlayerIdQuery> {
  constructor(
    private transfersStore: TransfersStore,
  ) {}

  async execute(query: FindTransferByPlayerIdQuery): Promise<Transfer> {
    return await this.transfersStore.findByPlayerIdOrFail(query.playerId);
  }
}