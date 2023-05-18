import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { UserLocationModule } from './user-location/user-location.module';
import { UserImageModule } from './user-image/user-image.module';
import { UserSocialLinksModule } from './user-social-links/user-social-links.module';
import {User} from "./user/user.model";
import {Image} from "./user-image/user-image.model";
import {UserLocation} from "./user-location/user-location.model";
import {UserSocialLinks} from "./user-social-links/user-social-links.model";
import {UserImage} from "./user/user-image.model";
import { HobbyModule } from './hobby/hobby.module';
import {LanguageModule} from "./language/language.module";
import {UserLanguage} from "./user/user-language.model";
import {UserHobby} from "./user/user-hobby.model";
import {Hobby} from "./hobby/hobby.model";
import {Language} from "./language/language.model";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
      }),

      SequelizeModule.forRoot({
          dialect: "postgres",
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [
              User,
              Image,
              UserLocation,
              UserSocialLinks,
              UserImage,
              UserHobby,
              UserLanguage,
              Hobby,
              Language
          ],
          autoLoadModels: true,
      }),

      UserModule,

      UserLocationModule,

      UserImageModule,

      UserSocialLinksModule,

      HobbyModule,

      LanguageModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
