import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Language, LanguageSchema} from "../schemas/language.schema";

@Module({
  providers: [LanguageService],
  imports: [
    MongooseModule.forFeature([{ name: Language.name, schema: LanguageSchema }])
  ]
})
export class LanguageModule {}
