import {Model, Table, Column, DataType, ForeignKey, BelongsToMany, HasOne, HasMany} from "sequelize-typescript"
import {ApiProperty} from "@nestjs/swagger";
import {Image} from "../user-image/user-image.model";
import {UserImage} from "./user-image.model";
import {UserLocation} from "../user-location/user-location.model";
import {UserSocialLinks} from "../user-social-links/user-social-links.model";
import {UserHobby} from "../user-hobby/user-hobby.model";

interface UserCreationAttributes{
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    description?: string,
    locationId?:number,
    settings?:object
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttributes>{

    @ApiProperty({description: "User ID", example: 1})
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({description: "User Email", example: "example@mail.com"})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull:false
    })
    email: string;

    @ApiProperty({description: "User Password", example: "12345"})
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    password: string;

    @ApiProperty({description: "User First Name", example: "John"})
    @Column({
        type: DataType.STRING
    })
    firstName: string;

    @ApiProperty({description: "User Last Name", example: "Johnson"})
    @Column({
        type: DataType.STRING
    })
    lastNme: string;

    @ApiProperty({description: "User Phone", example: "38099123456"})
    @Column({
        type: DataType.STRING,
        unique: true
    })
    phone: string;

    @ApiProperty({description: "User Location ID", example: 123})
    @ForeignKey(() => UserLocation)
    @Column({
        type: DataType.BIGINT
    })
    locationId: number;

    @ApiProperty({description: "User Description", example: "My name is John. I am from Kyiv, Ukraine"})
    @Column({
        type: DataType.TEXT
    })
    description: string;

    @ApiProperty({description: "User Settings", example: {isDarkModeForced: true}})
    @Column({
        type: DataType.JSON
    })
    settings: object;


    // relations
    @BelongsToMany(() => Image, () => UserImage)
    images: Image[];

    @HasOne(() => UserLocation, "id")
    location: Location[];

    @HasMany(() => UserSocialLinks, "userId")
    socialLinks: UserSocialLinks[];

    @HasMany(() => UserHobby, "userId")
    hobbies: UserHobby[];
}