import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/user.schema";

@Module({
  providers: [UserService],
  controllers: [],
  imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
    exports: [
        UserService
    ]

})
export class UserModule {}
