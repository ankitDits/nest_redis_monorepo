import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @EventPattern('create_user')
  async create(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @EventPattern('find_all_users')
  async findAll() {
    return await this.usersService.findAll();
  }

  @EventPattern('find_user_by_id')
  async findOne(_id: string) {
    return await this.usersService.findOne(_id);
  }

  @EventPattern('update_user')
  async update(_id: string, updateUserDto: UpdateUserDto) {
    return await this.usersService.update(_id, updateUserDto);
  }

  @EventPattern('remove_user')
  async remove(_id: string) {
    return await this.usersService.remove(_id);
  }
}
