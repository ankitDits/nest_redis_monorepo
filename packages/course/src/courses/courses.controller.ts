import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller()// Controller decorator, no route prefix defined
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }// Constructor to inject CoursesService

  @EventPattern('create_course')// Event pattern for creating a course
  create(createCourseDto: CreateCourseDto) {
    // Method to create a new course
    return this.coursesService.creawte(createCourseDto);// Call CoursesService to create a new course
  }

  @EventPattern('find_all')// Event pattern for finding all courses
  async findAll() {
    // Method to fetch all courses
    return await this.coursesService.findAll();// Call CoursesService to fetch all courses
  }

  @EventPattern('get_course')// Event pattern for finding a course by ID
  async findOne(id: string) {
    // Method to fetch a single course by ID
    return await this.coursesService.findOne(id);// Call CoursesService to fetch a single course by ID
  }
}
