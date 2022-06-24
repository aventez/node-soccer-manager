import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import Player from "../entities/player.entity";
import { FindPlayerByIdQuery } from "../queries/find-player-by-id.query";
import UpdatePlayerDto from "../dto/update-player.dto";
import { UpdatePlayerCommand } from "../commands/update-player.command";
import { CreatePlayerCommand } from "../commands/create-player.command";

@Injectable()
export class PlayersService {
    constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus
    ) {}

    async findPlayerById(id: string, loadRelations: boolean = false): Promise<Player> {
      return await this.queryBus.execute(new FindPlayerByIdQuery(id, loadRelations));
    }

    async updatePlayer(id: string, values: Record<string, any>): Promise<void> {
      await this.commandBus.execute(new UpdatePlayerCommand(id, values));
    }

    async createPlayer(
      firstName: string,
      lastName: string,
      positionType: string,
      country: string,
      age: number,
      marketValue: number,
      id: string
    ) {
      await this.commandBus.execute(new CreatePlayerCommand(
        firstName,
        lastName,
        positionType,
        country,
        age,
        marketValue,
        id
      ));
    }
}