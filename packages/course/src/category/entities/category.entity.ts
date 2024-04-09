import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { nanoid } from "nanoid";

@Schema()
export class Category {
    @Prop({ default: () => nanoid(), unique: true })
    _id: string;

    @Prop()
    name: string;

    @Prop()
    description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);