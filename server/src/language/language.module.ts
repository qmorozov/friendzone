import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Language, LanguageSchema} from "../schemas/language.schema";
import { LanguageController } from './language.controller';

@Module({
  providers: [LanguageService],
  imports: [
    MongooseModule.forFeature([{ name: Language.name, schema: LanguageSchema }])
  ],
  exports: [
      LanguageService
  ],
  controllers: [LanguageController]
})
export class LanguageModule {}
