import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString} from "class-validator";

export class ForgotPasswordDto {
    @ApiProperty({description: "User Email", example: "example@mail.com"})
    @IsString({message: "Email must be a string"})
    @IsEmail({}, {message: "Incorrect email format"})
    readonly email: string;
}
