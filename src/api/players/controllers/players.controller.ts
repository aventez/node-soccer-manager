import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Param, ParseUUIDPipe, Put, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ReqUser } from "../../../decorators/req-user.decorator";
import { JwtAuthenticationGuard } from "../../authentication/guards/jwt.guard";
import UpdatePlayerDto from "../dto/update-player.dto";
import User from "../../users/entities/user.entity";
import { PlayersService } from "../services/players.service";
import Player from "../entities/player.entity";

@ApiTags('player')
@ApiBearerAuth()
@Controller('player')
export default class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
  ) {}

  @ApiResponse({ status: 200, description: 'Updated player' })
  @ApiResponse({ status: 403, description: 'Authorization issue' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  async putAction(
    @ReqUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePlayerDto
  ): Promise<void> {
    const player: Player = await this.playersService.findPlayerById(id, true);
    if (player?.team?.user.id !== user.id) {
      throw new UnauthorizedException('You are not allowed to update this player');
    }

    await this.playersService.updatePlayer(id, {
      firstName: dto.firstName,
      lastName: dto.lastName,
      country: dto.country,
    });
  }
}