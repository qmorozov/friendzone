import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";

export type HobbyDocument = HydratedDocument<Hobby>;

@Schema()
export class Hobby{
    @ApiProperty({description: "Hobby Name", example: "Sport"})
    @Prop({required: true})
    name: String

    @Prop()
    @ApiProperty({description: "Hobby Name in Russian", example: "Рыбалка"})
    nameRu: String

    @Prop()
    @ApiProperty({description: "Hobby Name in Ukrainian", example: "Риболовля"})
    nameUa: String

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const HobbySchema = SchemaFactory.createForClass(Hobby);