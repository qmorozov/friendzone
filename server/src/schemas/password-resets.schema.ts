import {HydratedDocument} from "mongoose";
import {Prop, SchemaFactory, Schema} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {User} from "./user.schema";

export type PasswordResetsDocument = HydratedDocument<PasswordResets>;

@Schema()
export class PasswordResets {
    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: 'User',  required: true})
    userId: User;

    @Prop({
        required: true,
    })
    token: String;

    @Prop({default: Date.now})
    createdAt: Date;
}

export const PasswordResetSchema = SchemaFactory.createForClass(PasswordResets);