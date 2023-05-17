import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) userRepository: typeof User) {}

    // async createUser(dto)

}
