import { Module } from '@nestjs/common';
import { UserLanguageService } from './user-language.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {UserLanguage} from "./user-language.model";

@Module({
  providers: [UserLanguageService],
  imports: [
    SequelizeModule.forFeature([User, UserLanguage])
  ]
})
export class UserLanguageModule {}
