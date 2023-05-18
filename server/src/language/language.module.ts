import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {Language} from "./language.model";
import {UserLanguage} from "../user/user-language.model";

@Module({
  providers: [LanguageService],
  imports: [
    SequelizeModule.forFeature([User, Language, UserLanguage])
  ]
})
export class LanguageModule {}
