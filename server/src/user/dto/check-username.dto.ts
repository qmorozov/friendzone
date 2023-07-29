import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CheckUsernameDto {
    @ApiProperty({description: "Username, which needs to check", example: "john213"})
    @IsString({message: "Username must be a string"})
    readonly username: string;
}