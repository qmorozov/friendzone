import {Model, Table, Column, DataType, ForeignKey, BelongsTo} from "sequelize-typescript"
import {User} from "../user/user.model";

interface SocialLinksCreationAttributes{
    name: string,
    link: string
}

@Table({tableName: "social_links"})
export class SocialLinks extends Model<SocialLinks, SocialLinksCreationAttributes>{

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
        type: DataType.STRING,
        allowNull:false
    })
    link: string;

    @Column({
        type: DataType.BIGINT,
        allowNull:false
    })
    @ForeignKey(() => User)
    userId: string;

    @BelongsTo(() => User,"id")
    users: User[]
}