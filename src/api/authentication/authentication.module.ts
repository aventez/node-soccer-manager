import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationService } from "./services/authentication.service";
import { AuthenticationController } from "./controllers/authentication.controller";
import { EncryptionModule } from "../../services/encryption/encryption.module";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    EncryptionModule,
    CqrsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwtKey'),
        signOptions: {
          expiresIn: `${configService.get('jwtExpirationTime')}s`,
        },
      }),
    }),
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
