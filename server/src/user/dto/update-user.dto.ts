import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto{

    @ApiProperty({description: "User First Name", example: "John"})
    readonly firstName: string;

    @ApiProperty({description: "User Last Name", example: "Johnson"})
    readonly lastName: string;

    @ApiProperty({description: "User Phone", example: "38099123456"})
    readonly phone: string;

    @ApiProperty({description: "User Description", example: "My name is John. I am from Kyiv, Ukraine"})
    readonly description: string;

    @ApiProperty({description: "Location Object", example: {
            country: "Ukraine",
            city: "Kyiv",
            latitude: "6.5568768",
            longitude: "3.3488896",
            accuracy: "7173.528443511279",
        }
    })
    readonly location?: object;

    @ApiProperty({description: "User Settings", example: {isDarkModeForced: true}})
    readonly settings?:object

}