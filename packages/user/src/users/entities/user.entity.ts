import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { nanoid } from 'nanoid';

@Schema()
export class User {
    @Prop({ default: () => nanoid(), index: { unique: true } })
    _id: string;

    @Prop()
    userName: string;

    @Prop()
    userEmail: string;

    @Prop()
    userRole: string;
}

export const UserSchema = SchemaFactory.createForClass(User);