import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { nanoid } from "nanoid";

@Schema()
export class Lesson {
    @Prop({ default: () => nanoid(), unique: true })
    _id: string;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({ type: String, ref: 'Course' })
    course: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);