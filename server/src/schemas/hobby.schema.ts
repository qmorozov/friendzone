import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";

export type HobbyDocument = HydratedDocument<Hobby>;

@Schema()
export class Hobby{
    @ApiProperty({description: "Hobby Name", example: "Sport"})
    @Prop({required: true})
    name: String

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const HobbySchema = SchemaFactory.createForClass(Hobby);