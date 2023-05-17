import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({description: "User Email", example: "example@mail.com"})
    readonly email: string;

    @ApiProperty({description: "User Password", example: "12345"})
    readonly password: string;
}