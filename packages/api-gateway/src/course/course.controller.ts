import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  /*
   */
  @Post('create')// HTTP POST endpoint decorator
  async create(@Body() data: CreateCourseDto) {
    // Method to create a new course
    return this.courseService.create(data);
  }

  @Get(':_id')// HTTP GET endpoint decorator
  async getById(@Param("_id") _id: string) {
    // Method to get a course with id
    return await this.courseService.getById(_id);
  }
}
