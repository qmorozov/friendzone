import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { HobbyModule } from './hobby/hobby.module';
import {LanguageModule} from "./language/language.module";
import {AuthModule} from "./auth/auth.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
      }),

      MongooseModule.forRoot(process.env.MONGO_URL),

      UserModule,

      HobbyModule,

      LanguageModule,

      AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
