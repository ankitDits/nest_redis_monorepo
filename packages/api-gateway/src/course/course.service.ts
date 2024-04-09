import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CourseService {
  constructor(
    @Inject('course_queue') private readonly courseClient: ClientProxy,
  ) { }

  async create(req) {
    try {
      //Sending request to the course's microservice
      return await this.courseClient.send('create_course', req).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async getById(_id: string) {
    try {
      return await this.courseClient.send('get_course', _id).toPromise();
    } catch (error) {
      return error;
    }
  }
}
