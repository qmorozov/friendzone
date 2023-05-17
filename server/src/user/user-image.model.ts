import {Model, Table, Column, DataType, ForeignKey, BelongsToMany, HasOne} from "sequelize-typescript"
import {Image} from "../user-image/user-image.model";
import {User} from "./user.model";

@Table({tableName: "user_images", createdAt: false, updatedAt: false})
export class UserImage extends Model<UserImage>{

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
    })
    userId: number;

    @ForeignKey(() => Image)
    @Column({
        type: DataType.BIGINT,
    })
    imageId: number;
}