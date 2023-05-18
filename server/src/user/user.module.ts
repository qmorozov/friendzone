import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Image} from "../user-image/user-image.model";
import {UserLocation} from "../user-location/user-location.model";
import {UserImage} from "./user-image.model";
import {UserSocialLinks} from "../user-social-links/user-social-links.model";
import {Hobby} from "../hobby/hobby.model";
import {Language} from "../language/language.model";
import {UserLanguage} from "./user-language.model";
import {UserHobby} from "./user-hobby.model";

@Module({
  providers: [UserService],
  controllers: [],
  imports: [
      SequelizeModule.forFeature([
          User,
          Image,
          UserLocation,
          UserImage,
          UserSocialLinks,
          UserHobby,
          UserLanguage,
          Hobby,
          Language
      ])
  ],

    exports: [
        UserService
    ]
})
export class UserModule {}
