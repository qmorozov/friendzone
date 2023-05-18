import {Model, Table, Column, DataType, ForeignKey, BelongsToMany, HasOne, BelongsTo} from "sequelize-typescript"
import {ApiProperty} from "@nestjs/swagger";
import {UserImage} from "../user/user-image.model";
import {User} from "../user/user.model";

interface UserHobbyCreationAttributes{
    name: string,
}

@Table({tableName: "user_hobbies"})
export class UserHobby extends Model<UserHobby, UserHobbyCreationAttributes>{

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

    @Column({
        type: DataType.BIGINT,
        allowNull:false
    })
    @ForeignKey(() => User)
    userId: number;

    @BelongsTo(() => User,"id")
    users: User[]
}