import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  async create(@Body() req) {
    return this.courseService.create(req);
  }

  @Get(':_id')
  async getById(@Param("_id") _id: string) {
    return await this.courseService.getById(_id);
  }
}
