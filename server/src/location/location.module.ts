import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {Location} from "./location.model";

@Module({
  providers: [LocationService],
  controllers: [],
  imports: [
    SequelizeModule.forFeature([User, Location])
  ]
})
export class LocationModule {}
