import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllTransfersQuery } from "./find-all-transfers.query";
import { TransfersStore } from "../stores/transfers.store";
import Transfer from "../entities/transfer.entity";

@QueryHandler(FindAllTransfersQuery)
export class FindAllTransfersHandler implements IQueryHandler<FindAllTransfersQuery> {
  constructor(
    private transfersStore: TransfersStore,
  ) {}

  async execute(query: FindAllTransfersQuery): Promise<Transfer[]> {
    return await this.transfersStore.findAll();
  }
}