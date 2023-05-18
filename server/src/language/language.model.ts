import {Model, Table, Column, DataType, ForeignKey, BelongsToMany} from "sequelize-typescript"
import {User} from "../user/user.model";
import {UserLanguage} from "../user/user-language.model";
import {ApiProperty} from "@nestjs/swagger";

interface LanguageCreationAttributes{
    name: string,
}

@Table({tableName: "languages"})
export class Language extends Model<Language, LanguageCreationAttributes>{

    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({description: "Language Name", example: "English"})
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    name: string;

    @BelongsToMany(() => User,() => UserLanguage)
    users: User[]
}