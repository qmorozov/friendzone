import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async create(dto: CreateUserDto) {

        const password = await bcrypt.hash(dto.password, 5)

        return await this.userRepository.create({email: dto.email, password});
    }

    async getByEmail(email: string){
        return await this.userRepository.findOne({where: {email}})
    }
}
