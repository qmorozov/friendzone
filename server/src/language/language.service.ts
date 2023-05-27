import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Language} from "../schemas/language.schema";
import {Model} from "mongoose";

@Injectable()
export class LanguageService {

    constructor(@InjectModel(Language.name) private languageModel: Model<Language>) {}

    async findManyById(ids: Array<string>){
        return this.languageModel.findById(ids);
    }

    async getAll(){
        return this.languageModel.find()
    }
}
