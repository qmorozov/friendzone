import { Injectable } from '@nestjs/common';
import {randomUUID} from "crypto";
import {InjectModel} from "@nestjs/mongoose";
import {PasswordResets} from "../schemas/password-resets.schema";
import {Model} from "mongoose";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class PasswordService {

    constructor(
        @InjectModel(PasswordResets.name) private passwordResetsModel: Model<PasswordResets>,
        private configService: ConfigService
    ) {}

    async generateToken(userId: string) {
        const token = randomUUID();

        await this.passwordResetsModel.create({userId, token})

        return token;
    }

    async getUserIdByToken(token: string){

        const entity = await this.passwordResetsModel.findOne({token}).exec()

        return entity?.userId;
    }

    async validateToken(token: string, userId: string){

        const entity = await this.passwordResetsModel.findOne({token, userId}).exec()

        if(!entity){
            return false;
        }

        const tokenLifetime = Number(this.configService.get('PASSWORD_RESET_TOKEN_LIFETIME_H')) || 2

        const today = new Date();

        const tokenExpirationDate = new Date(entity.createdAt).setHours(today.getHours() + tokenLifetime)

        return tokenExpirationDate > today.getTime();
    }
}
