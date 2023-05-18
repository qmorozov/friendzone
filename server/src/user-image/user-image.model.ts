import {Model, Table, Column, DataType, ForeignKey, BelongsToMany, HasOne} from "sequelize-typescript"
import {ApiProperty} from "@nestjs/swagger";
import {UserImage} from "../user/user-image.model";
import {User} from "../user/user.model";

interface ImageCreationAttributes{
    fileName: string,
}

@Table({tableName: "images"})
export class Image extends Model<Image, ImageCreationAttributes>{

    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull:false
    })
    fileName: string;

    @BelongsToMany(() => User, () => UserImage)
    users: User[]
}