import {Model, Table, Column, DataType, BelongsTo} from "sequelize-typescript"
import {User} from "../user/user.model";

interface UserLocationCreationAttributes{
    country: string,
    city: string,
    latitude?: string,
    longitude?: string,
    accuracy?: string,
    altitudeAccuracy?: string,
    speed?: string
}

@Table({tableName: "user_locations"})
export class UserLocation extends Model<UserLocation, UserLocationCreationAttributes>{

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
    country: string;

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    city: string;

    @Column({
        type: DataType.STRING
    })
    latitude: string;

    @Column({
        type: DataType.STRING
    })
    longitude: string;

    @Column({
        type: DataType.STRING
    })
    accuracy: string;

    @Column({
        type: DataType.STRING
    })
    altitudeAccuracy: string;

    @Column({
        type: DataType.STRING
    })
    speed: string;

    @BelongsTo(() => User, "locationId")
    users: User[]
}