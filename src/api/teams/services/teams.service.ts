import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import Team from "../entities/team.entity";
import { FindTeamByUserIdQuery } from "../queries/find-team-by-user-id.query";
import { CreateTeamCommand } from "../commands/create-team.command";
import { UpdateTeamCommand } from "../commands/update-team.command";

@Injectable()
export class TeamsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findTeamByUserId(userId: string): Promise<Team> {
    return await this.queryBus.execute(new FindTeamByUserIdQuery(userId));
  }

  async createTeam(
    name: string,
    country: string,
    budget: number,
    userId: string,
  ): Promise<Team> {
    return await this.commandBus.execute(new CreateTeamCommand(
      name,
      country,
      budget,
      userId,
    ));
  }

  async updateTeam(
    teamId: string,
    values: Record<string, any>
  ): Promise<void> {
    await this.commandBus.execute(
      new UpdateTeamCommand(teamId, values)
    );
  }
}

export default TeamsService;