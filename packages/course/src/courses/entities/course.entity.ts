import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { nanoid } from "nanoid";
import { Category } from "src/category/entities/category.entity";

@Schema()
export class Course {
    @Prop({ default: () => nanoid(), unique: true })
    _id: string;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({ type: String, ref: 'Category' })
    category: string;

    @Prop({ type: String, ref: 'User' })
    user: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);