import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {PasswordResets, PasswordResetSchema} from "../schemas/password-resets.schema";
import {UserModule} from "../user/user.module";
import {EmailModule} from "../email/email.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  providers: [PasswordService],
  controllers: [PasswordController],
  imports: [
    MongooseModule.forFeature([{ name: PasswordResets.name, schema: PasswordResetSchema }]),
      UserModule,
      EmailModule,
      ConfigModule
  ],

  exports: [
      PasswordService
  ]
})
export class PasswordModule {}
