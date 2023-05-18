import {Model, Table, Column, DataType, ForeignKey, BelongsTo, BelongsToMany} from "sequelize-typescript"
import {User} from "../user/user.model";
import {UserHobby} from "../user/user-hobby.model";
import {ApiProperty} from "@nestjs/swagger";

interface HobbyCreationAttributes{
    name: string,
}

@Table({tableName: "hobbies"})
export class Hobby extends Model<Hobby, HobbyCreationAttributes>{

    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({description: "Hobby Name", example: "Sport"})
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    name: string;

    @BelongsToMany(() => User,() => UserHobby)
    users: User[]
}