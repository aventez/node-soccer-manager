import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { JwtAuthenticationGuard } from "../../authentication/guards/jwt.guard";
import Transfer from "../entities/transfer.entity";
import { TransfersService } from "../services/transfers.service";
import CreateTransferDto from "../dto/create-transfer.dto";
import { TransferFinalizationService } from "../services/transfer-finalization.service";
import { ReqUser } from "../../../decorators/req-user.decorator";
import User from "../../users/entities/user.entity";
import { PlayersService } from "../../players/services/players.service";

@ApiTags('transfers')
@ApiBearerAuth()
@Controller('transfers')
export default class TransfersController {
  constructor(
   private readonly transfersService: TransfersService,
   private readonly transferFinalizationService: TransferFinalizationService,
   private readonly playersService: PlayersService,
  ) {}

  @ApiResponse({ status: 200, description: 'Fetched transfers list', type: [Transfer] })
  @Get('')
  @UseGuards(JwtAuthenticationGuard)
  async listAction(): Promise<Transfer[]> {
    return await this.transfersService.findAllTransfers();
  }

  @ApiResponse({ status: 200, description: 'Transfer created' })
  @Post('')
  @UseGuards(JwtAuthenticationGuard)
  async createAction(
    @ReqUser() user: User,
    @Body() dto: CreateTransferDto
  ): Promise<void> {
    const player = await this.playersService.findPlayerById(dto.playerId, true);

    if (player.team.id !== user.team.id) {
      throw new UnauthorizedException('Player is not in your team');
    }

    await this.transfersService.createTransfer(dto.playerId, dto.price);
  }

  @ApiResponse({ status: 200, description: 'Player bought' })
  @Patch(':id/buy')
  @UseGuards(JwtAuthenticationGuard)
  async buyAction(
    @Param('id', ParseUUIDPipe) id: string,
    @ReqUser() user: User,
  ): Promise<void> {
    const transfer = await this.transfersService.findTransferById(id, true);
    await this.transferFinalizationService.tryToFinalizeTransfer(
      user.team,
      transfer
    );
  }
}