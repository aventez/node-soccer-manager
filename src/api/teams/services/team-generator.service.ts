import { Injectable } from "@nestjs/common";
import { TeamConfig } from "../../../config/constants/teamConfig";
import TeamDataProviderService from "./team-data-provider.service";
import Team from "../entities/team.entity";
import { GeneratedTeamData } from "../interfaces/generated-team-data.interface";
import { GeneratedPlayerData } from "../interfaces/generated-player-data.interface";
import TeamsService from "./teams.service";
import { PlayersService } from "../../players/services/players.service";

@Injectable()
export class TeamGeneratorService {
  constructor(
    private readonly teamDataProviderService: TeamDataProviderService,
    private readonly teamsService: TeamsService,
    private readonly playersService: PlayersService,
  ) {}

  public async generateTeamForUser(userId: string): Promise<void> {
    const team: Team = await this.createTeam(userId);

    const positions = TeamConfig.getPositions();
    const playersPerPosition = TeamConfig.getPlayersPerPosition();

    positions.forEach((position) => {
      for (let i = 0; i < playersPerPosition[position]; i++) {
        this.createPlayer(position, team);
      }
    });
  }

  private async createTeam(userId: string): Promise<Team> {
    const teamData: GeneratedTeamData = this.teamDataProviderService.generateTeamData();

    await this.teamsService.createTeam(
      teamData.name,
      teamData.country,
      teamData.budget,
      userId,
    );

    return await this.teamsService.findTeamByUserId(userId);
  }

  private async createPlayer(positionType: string, team: Team): Promise<void> {
    const generatedPlayerData: GeneratedPlayerData = this.teamDataProviderService.generatePlayerData();

    return await this.playersService.createPlayer(
      generatedPlayerData.firstName,
      generatedPlayerData.lastName,
      positionType,
      generatedPlayerData.country,
      generatedPlayerData.age,
      generatedPlayerData.marketValue,
      team.id,
    );
  }
}