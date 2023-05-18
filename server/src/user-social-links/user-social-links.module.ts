import { Module } from '@nestjs/common';
import { UserSocialLinksService } from './user-social-links.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {UserSocialLinks} from "./user-social-links.model";

@Module({
  providers: [UserSocialLinksService],
  imports: [
    SequelizeModule.forFeature([User, UserSocialLinks])
  ]
})
export class UserSocialLinksModule {}
