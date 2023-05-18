import {Model, Table, Column, DataType, ForeignKey, BelongsToMany} from "sequelize-typescript"
import {User} from "./user.model";
import {Language} from "../language/language.model";


@Table({tableName: "user_languages", createdAt: false, updatedAt: false})
export class UserLanguage extends Model<UserLanguage>{

    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    userId: number;

    @ForeignKey(() => Language)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    languageId: number;
}