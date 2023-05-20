import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";

export type LanguageDocument = HydratedDocument<Language>;

@Schema()
export class Language{
    @ApiProperty({description: "Language Name", example: "English"})
    @Prop({required: true})
    name: String

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const LanguageSchema = SchemaFactory.createForClass(Language)