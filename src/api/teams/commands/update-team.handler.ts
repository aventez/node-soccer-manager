import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTeamCommand } from "./update-team.command";
import { TeamsStore } from "../stores/teams.store";

@CommandHandler(UpdateTeamCommand)
export class UpdateTeamHandler implements ICommandHandler<UpdateTeamCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly teamsStore: TeamsStore,
  ) {}

  async execute(command: UpdateTeamCommand): Promise<void> {
    await this.teamsStore.update(command.id, command.values);
  }
}