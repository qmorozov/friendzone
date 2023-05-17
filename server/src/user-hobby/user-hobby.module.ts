import { Module } from '@nestjs/common';
import { UserHobbyService } from './user-hobby.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {UserHobby} from "./user-hobby.model";

@Module({
  providers: [UserHobbyService],
  imports: [
    SequelizeModule.forFeature([User, UserHobby])
  ]
})
export class UserHobbyModule {}
