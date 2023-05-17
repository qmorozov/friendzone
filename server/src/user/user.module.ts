import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Image} from "../image/image.model";
import {Location} from "../location/location.model";
import {UserImage} from "./user-image.model";
import {SocialLinks} from "../social-links/social-links.model";

@Module({
  providers: [UserService],
  controllers: [],
  imports: [
      SequelizeModule.forFeature([User, Image, Location, UserImage, SocialLinks])
  ]
})
export class UserModule {}
