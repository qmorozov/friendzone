import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Hobby} from "../schemas/hobby.schema";

@Injectable()
export class HobbyService {
    constructor(@InjectModel(Hobby.name) private hobbyModel: Model<Hobby>) {}

    async findManyById(ids: Array<string>){
        return this.hobbyModel.find({_id: ids});
    }

    async getAll(){
        return this.hobbyModel.find()
    }

}
