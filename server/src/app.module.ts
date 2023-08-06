import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { HobbyModule } from './hobby/hobby.module';
import {LanguageModule} from "./language/language.module";
import {AuthModule} from "./auth/auth.module";
import {MongooseModule} from "@nestjs/mongoose";
import { PictureModule } from './picture/picture.module';
import { PasswordModule } from './password/password.module';
import { EmailModule } from './email/email.module';
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
      }),

      MongooseModule.forRoot(process.env.MONGO_URL),

      MailerModule.forRoot({
          transport: `smtps://${process.env.MAIL_USERNAME}:${process.env.MAIL_PASSWORD}@smtp.gmail.com`,
          template: {
              dir: process.cwd() + '/src/email/templates/',
              adapter: new HandlebarsAdapter(),
              options: {
                  strict: true,
              },
          },
      }),

      UserModule,

      HobbyModule,

      LanguageModule,

      AuthModule,

      PictureModule,

      PasswordModule,

      EmailModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
