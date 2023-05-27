import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/user.schema";
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
    exports: [
        UserService
    ]

})
export class UserModule {}
