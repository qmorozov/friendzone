import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import {ConfigModule} from "@nestjs/config";

@Module({
  providers: [EmailService],
  imports: [
    ConfigModule
  ],
  exports: [
      EmailService
  ]
})
export class EmailModule {}
