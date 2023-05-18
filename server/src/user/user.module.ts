import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Image} from "../user-image/user-image.model";
import {UserLocation} from "../user-location/user-location.model";
import {UserImage} from "./user-image.model";
import {UserSocialLinks} from "../user-social-links/user-social-links.model";
import {UserHobby} from "../user-hobby/user-hobby.model";
import {UserLanguage} from "../user-language/user-language.model";

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
          UserLanguage
      ])
  ]
})
export class UserModule {}
