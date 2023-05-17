import { Module } from '@nestjs/common';
import { SocialLinksService } from './social-links.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {SocialLinks} from "./social-links.model";

@Module({
  providers: [SocialLinksService],
  imports: [
    SequelizeModule.forFeature([User, SocialLinks])
  ]
})
export class SocialLinksModule {}
