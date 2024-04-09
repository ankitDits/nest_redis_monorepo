import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }
  @EventPattern('create_course')
  create(createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @EventPattern('find_all')
  async findAll() {
    return await this.coursesService.findAll();
  }

  @EventPattern('get_course')
  async findOne(id: string) {
    return await this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
