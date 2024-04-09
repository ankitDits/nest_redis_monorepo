import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { nanoid } from "nanoid";
import { Category } from "src/category/entities/category.entity";

@Schema()
export class CourseBuyer {
    @Prop({ default: () => nanoid(), unique: true })
    _id: string;

    @Prop({ type: String, ref: 'User' })
    user: string;

    @Prop({ type: String, ref: 'Course' })
    course: string;
}

export const CourseBuyerSchema = SchemaFactory.createForClass(CourseBuyer);