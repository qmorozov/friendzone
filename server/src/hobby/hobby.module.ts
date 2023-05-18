import { Module } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {UserHobby} from "../user/user-hobby.model";

@Module({
  providers: [HobbyService],
  imports: [
    SequelizeModule.forFeature([User, UserHobby])
  ]
})
export class HobbyModule {}
