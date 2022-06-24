import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindPlayerByIdQuery } from "./find-player-by-id.query";
import { PlayersStore } from "../stores/players.store";
import Player from "../entities/player.entity";

@QueryHandler(FindPlayerByIdQuery)
export class FindPlayerByIdHandler implements IQueryHandler<FindPlayerByIdQuery> {
  constructor(
    private readonly playersStore: PlayersStore,
  ) {}

  async execute(query: FindPlayerByIdQuery): Promise<Player> {
    return await this.playersStore.findByIdOrFail(query.id, query.loadRelations);
  }
}
