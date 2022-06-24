import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from "@nestjs/cqrs";
import Player from "./entities/player.entity";
import { CommandHandlers } from "./commands/handlers";
import PlayersController from "./controllers/players.controller";
import { QueryHandlers } from "./queries/handlers";
import { PlayersStore } from "./stores/players.store";
import { PlayersService } from "./services/players.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    CqrsModule,
  ],
  controllers: [PlayersController],
  providers: [
    PlayersStore,
    PlayersService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [
    PlayersService,
  ],
})
export class PlayersModule {}