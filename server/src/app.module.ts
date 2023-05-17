import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { ImageModule } from './image/image.module';
import { SocialLinksModule } from './social-links/social-links.module';
import {User} from "./user/user.model";
import {Image} from "./image/image.model";
import {Location} from "./location/location.model";
import {SocialLinks} from "./social-links/social-links.model";
import {UserImage} from "./user/user-image.model";

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
          models: [User, Image, Location, SocialLinks, UserImage],
          autoLoadModels: true,
      }),

      UserModule,

      LocationModule,

      ImageModule,

      SocialLinksModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
