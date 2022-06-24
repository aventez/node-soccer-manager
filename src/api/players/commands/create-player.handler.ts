import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreatePlayerCommand } from "./create-player.command";
import { PlayersStore } from "../stores/players.store";
import { PlayerAggregate } from "../aggregates/player.aggregate";

@CommandHandler(CreatePlayerCommand)
export class CreatePlayerHandler implements ICommandHandler<CreatePlayerCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly playersStore: PlayersStore,
  ) {}

  async execute(command: CreatePlayerCommand): Promise<void> {
    const player = await this.playersStore.create({
      firstName: command.firstName,
      lastName: command.lastName,
      position: command.position,
      country: command.country,
      age: command.age,
      marketValue: command.marketValue,
      team: { id: command.teamId },
    });

    const playerAggregate = this.eventPublisher.mergeObjectContext(
      await new PlayerAggregate(player.id),
    );
    playerAggregate.commit();
  }
}