import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePlayerCommand } from "./update-player.command";
import { PlayersStore } from "../stores/players.store";

@CommandHandler(UpdatePlayerCommand)
export class UpdatePlayerHandler implements ICommandHandler<UpdatePlayerCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly playersStore: PlayersStore,
  ) {}

  async execute(command: UpdatePlayerCommand): Promise<void> {
    await this.playersStore.update(command.id, command.values)
  }
}