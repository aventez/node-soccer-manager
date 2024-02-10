import { ForbiddenException, Injectable } from "@nestjs/common";
import Transfer from "../entities/transfer.entity";
import { TransfersService } from "./transfers.service";
import Team from "../../teams/entities/team.entity";
import { PlayersService } from "../../players/services/players.service";
import Player from "../../players/entities/player.entity";
import TeamsService from "../../teams/services/teams.service";

@Injectable()
export class TransferFinalizationService {
  constructor(
    private readonly transfersService: TransfersService,
    private readonly playersService: PlayersService,
    private readonly teamsService: TeamsService,
  ) {}

  async tryToFinalizeTransfer(buyerTeam: Team, transfer: Transfer): Promise<void> {
    const sellerTeam: Team = transfer.player.team;

    if (buyerTeam.id === sellerTeam.id) {
      throw new ForbiddenException("You can't buy your own player");
    }

    if (buyerTeam.budget < transfer.price) {
      throw new ForbiddenException("Not enough money");
    }

    await this.modifyTeamBudget(buyerTeam, buyerTeam.budget - transfer.price);
    await this.modifyTeamBudget(sellerTeam, sellerTeam.budget + transfer.price);

    await this.transferPlayer(transfer.player, buyerTeam);
  }

  private async modifyTeamBudget(team: Team, newBudget: number) {
    await this.teamsService.updateTeam(team.id, {
      budget: newBudget,
    });
  }

  private async transferPlayer(player: Player, newTeam: Team) {
    const multiplyFactor = Math.random() * (2 - 1.1) + 1.1;
    const newMarketValue = player.marketValue * multiplyFactor;

    await this.playersService.updatePlayer(player.id, {
      marketValue: newMarketValue,
      team: newTeam,
    });
  }
}