import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import FindAllTransfersQuery from "../queries/find-all-transfers.query";
import Transfer from "../entities/transfer.entity";
import CreateTransferCommand from "../commands/create-transfer.command";
import FindTransferByIdQuery from "../queries/find-transfer-by-id.query";
import FindTransferByPlayerIdQuery from "../queries/find-transfer-by-player-id.query";

@Injectable()
export class TransfersService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findAllTransfers(): Promise<Transfer[]> {
    return await this.queryBus.execute(new FindAllTransfersQuery());
  }

  async findTransferById(id: string, loadRelations: boolean = true): Promise<Transfer> {
    return await this.queryBus.execute(new FindTransferByIdQuery(id, loadRelations));
  }

  async findTransferByPlayerId(playerId: string): Promise<Transfer> {
    return await this.queryBus.execute(new FindTransferByPlayerIdQuery(playerId));
  }

  async createTransfer(playerId: string, price: number): Promise<void> {
    return await this.commandBus.execute(new CreateTransferCommand(
      playerId,
      price,
    ));
  }
}