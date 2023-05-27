import {Injectable} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt'
import {User} from "../schemas/user.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {UpdateUserDto} from "./dto/update-user.dto";
import {HobbyService} from "../hobby/hobby.service";
import {LanguageService} from "../language/language.service";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private hobbyService: HobbyService,
        private languageService: LanguageService
    ) {}

    async create(dto: CreateUserDto) {

        const password = await bcrypt.hash(dto.password, 5)

        return this.userModel.create({email: dto.email, password});
    }

    async getByEmail(email: string){
        return this.userModel.findOne({email}).exec();
    }

    async update(userId: string, dto: UpdateUserDto){

        const {languages, hobbies} = dto;

        const languageItems = await this.languageService.findManyById(languages);

        const hobbyItems = await this.hobbyService.findManyById(hobbies);

        return this.userModel.findOneAndUpdate({_id: userId}, {
            ...dto,
            languages: languageItems,
            hobbies: hobbyItems
        });
    }
}
