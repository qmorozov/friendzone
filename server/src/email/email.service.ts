import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {MailerService} from "@nestjs-modules/mailer";
import { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {

    constructor(
        private configService: ConfigService,
        private mailerService: MailerService,
    ) {}

    async sendPasswordResetLink(token: string, email: string, firstName: String){

        const resetPasswordLink = `${this.configService.get('APP_URL')}/auth/forgot-password/${token}`

        return this.sendMail(
            email,
            "Reset Password",
            'reset-password',
            {firstName, email, resetPasswordLink}
        )
    }

    private async setTransport() {

        const config: Options = {
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: this.configService.get('MAIL_USERNAME'),
                clientId: this.configService.get('CLIENT_ID'),
                clientSecret: this.configService.get('CLIENT_SECRET'),
                accessToken: this.configService.get('ACCESS_TOKEN'),
                refreshToken: this.configService.get('REFRESH_TOKEN')
            },
        };

        this.mailerService.addTransporter('gmail', config);
    }

    async sendMail(email: string, subject: string, template: string, context = {} ) {

        await this.setTransport();

        this.mailerService
            .sendMail({
                transporterName: 'gmail',
                to: email,
                from: this.configService.get('MAIL_USERNAME'),
                subject: subject,
                template,
                context
            })
            .catch((err) => {
                console.log(err);
            });

        return true
    }
}
