import {Model, Table, Column, DataType, ForeignKey, BelongsTo} from "sequelize-typescript"
import {User} from "../user/user.model";

interface UserLanguageCreationAttributes{
    name: string,
}

@Table({tableName: "user_language"})
export class UserLanguage extends Model<UserLanguage, UserLanguageCreationAttributes>{

    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    name: string;

    @ForeignKey(() => User)
    userId: number;

    @BelongsTo(() => User,"id")
    users: User[]
}