import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from "@nestjs/cqrs";
import TeamsController from "./controllers/teams.controller";
import Team from "./entities/team.entity";
import { QueryHandlers } from "./queries/handlers";
import { TeamGeneratorService } from "./services/team-generator.service";
import { CommandHandlers } from "./commands/handlers";
import TeamDataProviderService from "./services/team-data-provider.service";
import { TeamsStore } from "./stores/teams.store";
import TeamsService from "./services/teams.service";
import { PlayersModule } from "../players/players.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    CqrsModule,
    PlayersModule,
  ],
  controllers: [TeamsController],
  providers: [
    TeamDataProviderService,
    TeamGeneratorService,
    TeamsStore,
    TeamsService,
    ...QueryHandlers,
    ...CommandHandlers,
  ],
  exports: [
    TeamGeneratorService,
    TeamsService,
  ],
})
export class TeamsModule {}