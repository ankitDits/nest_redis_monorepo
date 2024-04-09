import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course, CourseSchema } from './entities/course.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseBuyer, CourseBuyerSchema } from 'src/course_buyer/entities/courseBuyer.entity';
import { Category, CategorySchema } from 'src/category/entities/category.entity';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: CourseBuyer.name, schema: CourseBuyerSchema },
      { name: Category.name, schema: CategorySchema },
    ])
  ]
})
export class CoursesModule { }
