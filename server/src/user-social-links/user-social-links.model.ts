import {Model, Table, Column, DataType, ForeignKey, BelongsTo} from "sequelize-typescript"
import {User} from "../user/user.model";

interface UserSocialLinksCreationAttributes{
    name: string,
    link: string
}

@Table({tableName: "user_social_links"})
export class UserSocialLinks extends Model<UserSocialLinks, UserSocialLinksCreationAttributes>{

    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    link: string;

    @Column({
        type: DataType.BIGINT,
        allowNull:false
    })
    @ForeignKey(() => User)
    userId: number;

    @BelongsTo(() => User,"id")
    users: User[]
}