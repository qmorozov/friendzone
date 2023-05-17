import { Module } from '@nestjs/common';
import { UserLocationService } from './user-location.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {UserLocation} from "./user-location.model";

@Module({
  providers: [UserLocationService],
  controllers: [],
  imports: [
    SequelizeModule.forFeature([User, UserLocation])
  ]
})
export class UserLocationModule {}
