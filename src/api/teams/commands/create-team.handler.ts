import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateTeamCommand } from "./create-team.command";
import { TeamsStore } from "../stores/teams.store";
import { TeamAggregate } from "../aggregates/team.aggregate";

@CommandHandler(CreateTeamCommand)
export class CreateTeamHandler implements ICommandHandler<CreateTeamCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly teamsStore: TeamsStore,
  ) {}

  async execute(command: CreateTeamCommand): Promise<void> {
    const team = await this.teamsStore.create({
      name: command.name,
      country: command.country,
      budget: command.budget,
      user: { id: command.userId },
    });

    const teamAggregate = this.eventPublisher.mergeObjectContext(
      await new TeamAggregate(team.id),
    );
    teamAggregate.commit();
  }
}