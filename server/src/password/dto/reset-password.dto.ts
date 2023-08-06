import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class ResetPasswordDto {
    @ApiProperty({description: "User UUID which needs to reset password", example: "hgfh1d41fds2f3fdfqwf"})
    @IsString({message: "User UUID must be a string"})
    readonly userId: string;

    @ApiProperty({description: "New user password", example: "!12345678"})
    @IsString({message: "Password must be a string"})
    readonly password: string;

    @ApiProperty({description: "Token to identify user", example: "gfdgkf-gfdjksdk-fhjsdbfhj-ksdfkj"})
    @IsString({message: "Token must be a string"})
    readonly token: string;
}
