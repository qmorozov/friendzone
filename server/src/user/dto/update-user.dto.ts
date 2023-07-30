import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsObject, IsOptional, IsString, Length} from "class-validator";

export class UpdateUserDto{

    @ApiProperty({description: "Unique username", required: true, example: "john123"})
    @IsString({message: "Username must be a string"})
    @Length(3, 10, {message: "Username must contains from 3 to 10 characters"})
    readonly username: string;

    @ApiProperty({description: "User First Name", required: true, example: "John"})
    @IsString({message: "First name must be a string"})
    @Length(2, 20, {message: "First name must contains from 2 to 20 characters"})
    readonly firstName: string;

    @ApiProperty({description: "User Last Name", required: true, example: "Johnson"})
    @IsString({message: "Last name must be a string"})
    @Length(2, 20, {message: "Last name must contains from 2 to 20 characters"})
    readonly lastName: string;

    @ApiProperty({description: "User Phone", required: false, example: "38099123456"})
    @IsString({message: "Phone must be a string"})
    @Length(7, 12, {message: "Phone name must contains from 7 to 12 characters"})
    @IsOptional()
    readonly phone?: string;

    @ApiProperty({description: "User Description", required: true, example: "My name is John. I am from Kyiv, Ukraine"})
    @IsString({message: "Description must be a string"})
    @Length(15, 150, {message: "Description name must contains from 15 to 150 characters"})
    @IsOptional()
    readonly description?: string;

    @ApiProperty({description: "User Hobbies", required: true, example: ["uuid1", "uuid2"]})
    @IsArray({message: "Settings must be an array" })
    readonly hobbies: Array<string>

    @ApiProperty({description: "User Languages", required: false, example: ["uuid1", "uuid2"]})
    @IsOptional()
    // @IsArray({message: "Languages must be an array" })
    readonly languages?: Array<string>

    @ApiProperty({description: "User Social Media Links Array", required: false, example: ['https://www.instagram.com/', 'https://facebook.com/']})
    @IsArray({message: "Social Media Links must be an array" })
    @IsOptional()
    readonly socialMedia?: Array<string>

    @ApiProperty({description: "User Picture Names Array", required: false, example: ['picture-1.jpg', 'picture-2.jpg']})
    @IsArray({message: "User Picture Names must be an array"})
    @IsOptional()
    readonly pictures?: Array<string>

    @ApiProperty({description: "Location Object", required: false, example: {
            country: "Ukraine",
            city: "Kyiv",
            latitude: "6.5568768",
            longitude: "3.3488896",
            accuracy: "7173.528443511279",
        }
    })
    @IsOptional()
    // @IsObject({message: "Location must be an object"})
    readonly location?: object;

    @ApiProperty({description: "User Settings", required: false, example: {isDarkModeForced: true}})
    @IsOptional()
    // @IsObject({message: "Settings must be an object" })
    readonly settings?:object

}