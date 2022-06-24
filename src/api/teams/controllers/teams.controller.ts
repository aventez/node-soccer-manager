import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { ReqUser } from "../../../decorators/req-user.decorator";
import { JwtAuthenticationGuard } from "../../authentication/guards/jwt.guard";
import UpdateTeamDto from "../dto/update-team.dto";
import User from "../../users/entities/user.entity";
import Team from "../entities/team.entity";
import TeamsService from "../services/teams.service";

@ApiTags('team')
@ApiBearerAuth()
@Controller('team')
export default class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
  ) {}

  @ApiResponse({ status: 200, description: 'Fetched team info', type: Team })
  @Get('')
  @UseGuards(JwtAuthenticationGuard)
  async entityAction(@ReqUser() user: User): Promise<Team> {
    return await this.teamsService.findTeamByUserId(user.id);
  }

  @ApiResponse({ status: 200, description: 'Updated team' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Put('')
  @UseGuards(JwtAuthenticationGuard)
  async putAction(@ReqUser() user: User, @Body() dto: UpdateTeamDto): Promise<void> {
    await this.teamsService.updateTeam(user.team.id, {
      name: dto.name,
      country: dto.country,
    });
  }
}