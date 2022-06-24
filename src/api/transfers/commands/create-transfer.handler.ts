import { CommandHandler, ICommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TransfersStore } from "../stores/transfers.store";
import CreateTransferCommand from "./create-transfer.command";

@CommandHandler(CreateTransferCommand)
export class CreateTransferHandler implements ICommandHandler<CreateTransferCommand> {
  constructor(
    private transfersStore: TransfersStore,
  ) {}

  async execute(command: CreateTransferCommand): Promise<void> {
    await this.transfersStore.create({
      price: command.price,
      player: { id: command.playerId },
    });
  }
}