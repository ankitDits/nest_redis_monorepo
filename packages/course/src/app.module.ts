import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import * as Joi from 'joi';
import { Course, CourseSchema } from './courses/entities/course.entity';
import { Category, CategorySchema } from './category/entities/category.entity';
import { CoursesModule } from './courses/courses.module';
import { Lesson, LessonSchema } from './lessons/entities/lessons.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    HttpModule,
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Lesson.name, schema: LessonSchema }
    ]),
    CoursesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
