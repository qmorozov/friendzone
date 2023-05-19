import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt'
import {User} from "../schemas/user.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(dto: CreateUserDto) {

        const password = await bcrypt.hash(dto.password, 5)

        console.log({email: dto.email, password});

        const createdUser = this.userModel.create({email: dto.email, password});

        return createdUser;
    }

    async getByEmail(email: string){
        return this.userModel.findOne({email}).exec();
    }
}
