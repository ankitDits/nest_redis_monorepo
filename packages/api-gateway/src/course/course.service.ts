import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @Inject('course_queue') private readonly courseClient: ClientProxy,
  ) { }

  /**
   * @param data: CreateCourseDto
   * @returns object of newly created course
   * @description this function is used to call the course client(microservice) and send data to save into the database
   * @DevelopedBy Ankit Thakur
   */
  async create(data: CreateCourseDto) {
    try {
      return await this.courseClient.send('create_course', data).toPromise();
    } catch (error) {
      throw error;
    }
  }

  /**
   * @returns object of course
   * @description this function is used to call the course client(microservice) and to get the course by id
   * @DevelopedBy Ankit Thakur
   */
  async getById(_id: string) {
    try {
      return await this.courseClient.send('get_course', _id).toPromise();
    } catch (error) {
      return error;
    }
  }
}
