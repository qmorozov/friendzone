import {HydratedDocument} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {Prop, SchemaFactory, Schema} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {Language} from "./language.schema";
import {Hobby} from "./hobby.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @ApiProperty({
        description: "User Email",
        example: "example@mail.com"
    })
    @Prop({
        required: true
    })
    email: String;

    @ApiProperty({
        description: "User Password",
        example: "12345"
    })
    @Prop({
        required: true
    })
    password: String;

    @ApiProperty({
        description: "User First Name",
        example: "John"
    })
    firstName: String;

    @ApiProperty({
        description: "User Last Name",
        example: "Johnson"
    })
    lastNme: String;

    @ApiProperty({
        description: "User Phone",
        example: "38099123456"
    })
    phone: String;

    @ApiProperty({description: "User Location Object", example: {
            country: "Ukraine",
            city: "Kyiv",
            latitude: 6.5568768,
            longitude: 3.3488896,
            accuracy: 7173.528443511279
    }})
    location: [{
        country: String,
        city: String,
        latitude?: Number,
        longitude?: Number,
        accuracy?: Number,
    }]

    @ApiProperty({
        description: "User Pictures Array",
        example: ['123.jpg', '321.jpg']
    })
    pictures: String[]

    @ApiProperty({
        description: "User Social Media Links Array",
        example: ['https://www.instagram.com/', 'https://facebook.com/']
    })
    socialMedia: String[]

    @ApiProperty({
        description: "User Description",
        example: "My name is John. I am from Kyiv, Ukraine"
    })
    description: String;

    @ApiProperty({
        description: "User Settings",
        example: {isDarkModeForced: true}
    })
    settings: [{
        isDarkModeForced: Boolean
    }];

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Language' })
    language: Language;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hobby' })
    hobby: Hobby;
}

export const UserSchema = SchemaFactory.createForClass(User);