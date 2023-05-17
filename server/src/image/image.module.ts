import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {Image} from "./image.model";
import {UserImage} from "../user/user-image.model";

@Module({
  providers: [ImageService],
  imports: [
    SequelizeModule.forFeature([User, Image, UserImage])
  ]
})
export class ImageModule {}
