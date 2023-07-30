import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';
import {JwtStrategy} from "./jwt.strategy";
import {jwtConstants} from "../constants/jwt.constants";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
      UserModule,
      PassportModule,
      JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '24h' },
      }),
  ]
})
export class AuthModule {}
