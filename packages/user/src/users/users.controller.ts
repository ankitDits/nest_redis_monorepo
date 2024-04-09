import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller()// Controller decorator, no route prefix defined
export class UsersController {
  constructor(private readonly usersService: UsersService) { }// Constructor to inject UsersService

  @EventPattern('create_user')// Event pattern for creating a user
  async create(createUserDto: CreateUserDto) {
    // Method to create a new user
    return await this.usersService.create(createUserDto);// Call UsersService to create a new user
  }

  @EventPattern('find_all_users')// Event pattern for find all users
  async findAll() {
    // Method to find all users
    return await this.usersService.findAll();// Call UsersService to find all users
  }

  @EventPattern('find_user_by_id')// Event pattern for find user by id
  async findOne(_id: string) {
    // Method to find user by id
    return await this.usersService.findOne(_id);// Call UsersService to find a user by id
  }

  @EventPattern('update_user')// Event pattern for update user
  async update(_id: string, updateUserDto: UpdateUserDto) {
    // Method to update user by id
    return await this.usersService.update(_id, updateUserDto);// Call UsersService to update a user by id
  }

  @EventPattern('remove_user')// Event pattern for remove user
  async remove(_id: string) {
    // Method to delete user by id
    return await this.usersService.remove(_id);// Call UsersService to delete a user by id
  }
}
