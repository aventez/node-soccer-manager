import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from "@nestjs/cqrs";
import TransfersController from "./controllers/transfers.controller";
import { QueryHandlers } from "./queries/handlers";
import { CommandHandlers } from "./commands/handlers";
import { TransfersService } from "./services/transfers.service";
import { TransfersStore } from "./stores/transfers.store";
import Transfer from "./entities/transfer.entity";
import { TransferFinalizationService } from "./services/transfer-finalization.service";
import { PlayersModule } from "../players/players.module";
import { TeamsModule } from "../teams/teams.module";
import { Constraints } from "./constraints/constraints";

@Module({
  imports: [
    TypeOrmModule.forFeature([Transfer]),
    CqrsModule,
    PlayersModule,
    TeamsModule,
  ],
  controllers: [TransfersController],
  providers: [
    TransfersService,
    TransfersStore,
    TransferFinalizationService,
    ...QueryHandlers,
    ...CommandHandlers,
    ...Constraints,
  ],
  exports: [
    TransfersService,
  ],
})
export class TransfersModule {}