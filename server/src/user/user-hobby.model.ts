import {Model, Table, Column, DataType, ForeignKey} from "sequelize-typescript"
import {User} from "./user.model";
import {Hobby} from "../hobby/hobby.model";


@Table({tableName: "user_hobbies", createdAt: false, updatedAt: false})
export class UserHobby extends Model<UserHobby>{

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

    @ForeignKey(() => Hobby)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    hobbyId: number;
}