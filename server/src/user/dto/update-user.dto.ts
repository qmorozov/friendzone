import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsObject, IsString, Length} from "class-validator";

export class UpdateUserDto{

    @ApiProperty({description: "User First Name", example: "John"})
    @IsString({message: "First name must be a string"})
    @Length(2, 20, {message: "First name must contains from 2 to 20 characters"})
    readonly firstName: string;

    @ApiProperty({description: "User Last Name", example: "Johnson"})
    @IsString({message: "Last name must be a string"})
    @Length(2, 20, {message: "Last name must contains from 2 to 20 characters"})
    readonly lastName: string;

    @ApiProperty({description: "User Phone", example: "38099123456"})
    @IsString({message: "Phone must be a string"})
    @Length(7, 12, {message: "Phone name must contains from 7 to 12 characters"})
    readonly phone: string;

    @ApiProperty({description: "User Description", example: "My name is John. I am from Kyiv, Ukraine"})
    @IsString({message: "Description must be a string"})
    @Length(15, 150, {message: "Description name must contains from 15 to 150 characters"})
    readonly description: string;

    @ApiProperty({description: "User Hobbies", example: ["uuid1", "uuid2"]})
    @IsArray({message: "Settings must be an array" })
    readonly hobbies: Array<string>

    @ApiProperty({description: "User Languages", example: ["uuid1", "uuid2"]})
    // @IsArray({message: "Languages must be an array" })
    readonly languages?: Array<string>

    @ApiProperty({description: "User Social Media Links Array", example: ['https://www.instagram.com/', 'https://facebook.com/']})
    @IsArray({message: "Social Media Links must be an array" })
    readonly socialMedia: Array<string>

    @ApiProperty({description: "Location Object", example: {
            country: "Ukraine",
            city: "Kyiv",
            latitude: "6.5568768",
            longitude: "3.3488896",
            accuracy: "7173.528443511279",
        }
    })
    // @IsObject({message: "Location must be an object"})
    readonly location?: object;

    @ApiProperty({description: "User Settings", example: {isDarkModeForced: true}})
    // @IsObject({message: "Settings must be an object" })
    readonly settings?:object

}