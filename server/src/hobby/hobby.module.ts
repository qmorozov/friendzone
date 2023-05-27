import { Module } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Hobby, HobbySchema} from "../schemas/hobby.schema";
import { HobbyController } from './hobby.controller';

@Module({
  providers: [HobbyService],
  imports: [
    MongooseModule.forFeature([{ name: Hobby.name, schema: HobbySchema }])
  ],

  exports: [
      HobbyService
  ],

  controllers: [HobbyController]
})
export class HobbyModule {}
