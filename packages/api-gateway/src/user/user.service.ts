import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('user_queue') private readonly userClient: ClientProxy,
  ) { }

  /**
    * @param data: CreateUserDto
    * @returns object of newly created user
    * @description this function is used to call the user client(microservice) and send data to save into the database
    * @DevelopedBy Ankit Thakur
  */
  async create(data: CreateUserDto) {
    try {
      return await this.userClient.send('create_user', data).toPromise();
    } catch (error) {
      throw error;
    }
  }

  /**
    * @returns object of user
    * @description this function is used to call the course client(microservice) and get user by id
    * @DevelopedBy Ankit Thakur
  */
  async getById(_id: string) {
    try {
      const rsp = await this.userClient.send('find_user_by_id', _id).toPromise();
      const user = await lastValueFrom(rsp);
      return user;
    } catch (error) {
      return error;
    }
  }

  /**
    * @returns array of user's objects
    * @description this function is used to call the course client(microservice) and get all users
    * @DevelopedBy Ankit Thakur
  */
  async findAll() {
    try {
      const rsp = await this.userClient.send('find_all_users', {}).toPromise();
      const user = await lastValueFrom(rsp);
      return user;
    } catch (error) {
      return error;
    }
  }

  /**
   * @param _id string
   * @param data UpdateUserDto
   * @returns updated object of user
   * @description this function is used to call the course client(microservice) and update the user by id
   * @DevelopedBy Ankit Thakur
 */
  async update(_id: string, data: UpdateUserDto) {
    try {
      const rsp = await this.userClient.send('update_user', { _id, data }).toPromise();
      const user = await lastValueFrom(rsp);
      return user;
    } catch (error) {
      return error;
    }
  }

  /**
   * @param _id string
   * @returns a message wheather user deleted or not
   * @description this function is used to call the course client(microservice) and remove the user by id
   * @DevelopedBy Ankit Thakur
 */
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
