import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import serverConfiguration from './config/server.config';
import { DatabaseModule } from './database/database.module';
import configValidator from './validators/config';
import databaseConfiguration from './config/database.config';
import { UsersModule } from "./api/users/users.module";
import { AuthenticationModule } from "./api/authentication/authentication.module";
import { TeamsModule } from "./api/teams/teams.module";
import { PlayersModule } from "./api/players/players.module";
import { TransfersModule } from "./api/transfers/transfers.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidator,
      validationOptions: {
        allonUnknown: true,
      },
      isGlobal: true,
      load: [serverConfiguration, databaseConfiguration],
    }),
    DatabaseModule,
    AuthenticationModule,
    UsersModule,
    TeamsModule,
    PlayersModule,
    TransfersModule,
  ],
})
export class AppModule {}
