import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({description: "User Email", example: "example@mail.com"})
    @IsString({message: "Email must be a string"})
    @IsEmail({}, {message: "Incorrect email format"})
    readonly email: string;

    @ApiProperty({description: "User Password", example: "12345"})
    @IsString({message: "Password must be a string"})
    @Length(5, 50, {message: "Password must contains from 5 to 50 characters"})
    readonly password: string;
}