import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindTeamByUserIdQuery } from "./find-team-by-user-id.query";
import { TeamsStore } from "../stores/teams.store";
import Team from "../entities/team.entity";

@QueryHandler(FindTeamByUserIdQuery)
export class FindTeamByUserIdHandler implements IQueryHandler<FindTeamByUserIdQuery> {
    constructor(
        private readonly teamsStore: TeamsStore,
    ) {}

    async execute(query: FindTeamByUserIdQuery): Promise<Team> {
        return await this.teamsStore.findByUserIdOrFail(query.userId);
    }
}
