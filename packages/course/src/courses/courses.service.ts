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

  /**
    * @param createCourseDto: CreateCourseDto
    * @returns object of newly created course
    * @description this function is used to save into the database
    * @DevelopedBy Ankit Thakur
  */
  async create(createCourseDto: CreateCourseDto) {
    try {
      // Attempt to create a new course using the provided DTO
      let createdCourse = await this.courseModel.create(createCourseDto)

      // Check if the course was successfully created
      if (createdCourse) {
        // Return the created course if successfull
        return createdCourse
      }

      // If course creation fails for any reason, throw an InternalServerErrorException
      throw new InternalServerErrorException('Failed to create course')
    } catch (error) {
      // If an error occurs during the course creation process, return the error
      return error
    }
  }

  /**
    * @returns array of course's objects
    * @description this function is used to get all courses from the database
    * @DevelopedBy Ankit Thakur
  */
  async findAll() {
    try {
      // Attempt to find all courses in the database
      let allCourses = await this.courseModel.find();

      // Check if any courses were found
      if (allCourses.length) {
        // If courses were found, return them
        return allCourses
      }

      // If no courses were found, return a message indicating that no data was found
      return "No data found"
    } catch (error) {
      // If an error occurs during the find operation, return the error
      return error
    }
  }


  /**
    * @returns object of course with user information(who created the course) & category information(category of the course) & buyers information(who have bought the course) & lessons information(lessons present in the course)
    * @description this function is used to get course from the database by id
    * @DevelopedBy Ankit Thakur
  */
  async findOne(id: string) {
    try {
      // Use aggregation to retrieve course information along with related data
      let isCourseExists = await this.courseModel.aggregate([
        { $match: { _id: id } }, // Match course by ID

        // Lookup user information based on the 'user' field in the course document
        {
          $lookup: {
            from: "users",
            localField: 'user',
            foreignField: '_id',
            as: "user"
          }
        },

        // Lookup category information based on the 'category' field in the course document
        {
          $lookup: {
            from: "categories",
            localField: 'category',
            foreignField: '_id',
            as: "category"
          }
        },

        // Lookup buyers information based on the 'course' field in the coursebuyers document
        {
          $lookup: {
            from: "coursebuyers",
            localField: '_id',
            foreignField: 'course',
            as: "buyers"
          }
        },

        // Lookup lessons information based on the 'course' field in the lessons document
        {
          $lookup: {
            from: "lessons",
            localField: '_id',
            foreignField: 'course',
            as: "lessons"
          }
        }
      ]);

      // Check if the course exists
      if (isCourseExists.length) {
        // If course exists, return the first result (assuming only one course with that ID exists)
        return isCourseExists[0]
      }

      // If course does not exist, throw a NotFoundException
      return new NotFoundException('Course not found')
    } catch (error) {
      // If an error occurs during the retrieval process, return the error
      return error
    }
  }
}
