import { Module } from '@nestjs/common';
import { UserImageService } from './user-image.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {Image} from "./user-image.model";
import {UserImage} from "../user/user-image.model";

@Module({
  providers: [UserImageService],
  imports: [
    SequelizeModule.forFeature([User, Image, UserImage])
  ]
})
export class UserImageModule {}
