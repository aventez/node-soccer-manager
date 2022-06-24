import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { CqrsModule } from "@nestjs/cqrs";
import UsersController from "./controllers/users.controller";
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from "./commands/handlers";
import { Constraints } from "./constraints/constraints";
import { EventHandlers } from "./events/handlers";
import { TeamsModule } from "../teams/teams.module";
import UsersService from "./services/users.service";
import { UsersStore } from "./stores/users.store";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TeamsModule,
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersStore,
    UsersService,
    ...Constraints,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [
    UsersService,
  ],
})
export class UsersModule {}