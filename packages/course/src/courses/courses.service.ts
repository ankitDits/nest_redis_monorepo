import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './entities/course.entity';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
  ) { }

  async create(createCourseDto: CreateCourseDto) {
    try {
      let createdCourse = await this.courseModel.create(createCourseDto)
      if (createdCourse) {
        return createdCourse
      }
      throw new InternalServerErrorException('Failed to create course')
    } catch (error) {
      return error
    }
  }

  async findAll() {
    try {
      let allCourses = await this.courseModel.find();
      return allCourses;
    } catch (error) {
      return error
    }
  }

  async findOne(id: string) {
    try {
      let isCourseExists = await this.courseModel.aggregate([
        { $match: { _id: id } },
        {
          $lookup: {
            from: "users",
            localField: 'user',
            foreignField: '_id',
            as: "user"
          }
        },
        {
          $lookup: {
            from: "categories",
            localField: 'category',
            foreignField: '_id',
            as: "category"
          }
        },
        {
          $lookup: {
            from: "coursebuyers",
            localField: '_id',
            foreignField: 'course',
            as: "buyers"
          }
        },
        {
          $lookup: {
            from: "lessons",
            localField: '_id',
            foreignField: 'course',
            as: "lessons"
          }
        }
      ]);


      if (isCourseExists.length) {
        return isCourseExists[0]
      }
      return new NotFoundException('Course not found')
    } catch (error) {
      return error
    }
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
