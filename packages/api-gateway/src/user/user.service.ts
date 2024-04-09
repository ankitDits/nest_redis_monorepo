import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('user_queue') private readonly userClient: ClientProxy,
  ) { }

  async create(req) {
    try {
      //Sending request to the user's microservice
      return await this.userClient.send('create_user', req).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async getById(_id: string) {
    try {
      const rsp = await this.userClient.send('find_user_by_id', _id).toPromise();
      const user = await lastValueFrom(rsp);
      return user;
    } catch (error) {
      return error;
    }
  }
  async findAll() {
    try {
      const rsp = await this.userClient.send('find_all_users', {}).toPromise();
      const user = await lastValueFrom(rsp);
      return user;
    } catch (error) {
      return error;
    }
  }
  async update(_id: string, data: UpdateUserDto) {
    try {
      const rsp = await this.userClient.send('update_user', { _id, data }).toPromise();
      const user = await lastValueFrom(rsp);
      return user;
    } catch (error) {
      return error;
    }
  }
  async remove(_id: string) {
    try {
      const rsp = await this.userClient.send('remove_user', _id).toPromise();
      const user = await lastValueFrom(rsp);
      return user;
    } catch (error) {
      return error;
    }
  }
}
