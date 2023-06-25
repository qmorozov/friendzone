import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { HobbyModule } from './hobby/hobby.module';
import {LanguageModule} from "./language/language.module";
import {AuthModule} from "./auth/auth.module";
import {MongooseModule} from "@nestjs/mongoose";
import { PictureModule } from './picture/picture.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
      }),

      MongooseModule.forRoot(process.env.MONGO_URL),

      UserModule,

      HobbyModule,

      LanguageModule,

      AuthModule,

      PictureModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
