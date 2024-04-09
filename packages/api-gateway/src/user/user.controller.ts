import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post('create')// HTTP POST endpoint decorator
  async create(@Body() data: CreateUserDto) {
    // Method to create a new user
    return this.userService.create(data);
  }

  @Get(':_id')// HTTP GET endpoint decorator
  async getById(@Param() _id: string) {
    // Method to get user by id
    return await this.userService.getById(_id);
  }

  @Get('')// HTTP GET endpoint decorator
  async findAll() {
    // Method to get all users
    return await this.userService.findAll();
  }

  @Put(':_id')// HTTP PUT endpoint decorator
  async update(@Param() _id: string, @Body() data: UpdateUserDto) {
    // Method to update a user
    return await this.userService.update(_id, data);
  }

  @Delete(':_id')// HTTP DELETE endpoint decorator
  async remove(@Param() _id: string) {
    // Method to delete a user
    return await this.userService.remove(_id);
  }
}
