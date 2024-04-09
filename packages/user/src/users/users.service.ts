import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      let createdUser = await this.userModel.create(createUserDto);
      if (createdUser) {
        return createdUser
      }
      throw new InternalServerErrorException("Failed to create user")
    } catch (error) {
      console.log(error?.message);

      return error
    }
  }

  async findAll() {
    try {
      let allUsers = await this.userModel.find();
      if (allUsers.length) {
        return allUsers
      }
      return "No Data Found"
    } catch (error) {
      return error
    };
  }

  async findOne(_id: string) {
    try {
      let isUserExist = await this.userModel.findOne({ _id });
      if (isUserExist) {
        return isUserExist
      }
      throw new NotFoundException("User not found")
    } catch (error) {
      return error;
    }
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.findOne(_id);
      let updatedUser = await this.userModel.findOneAndUpdate({ _id }, { ...updateUserDto });
      if (updatedUser) {
        return updatedUser
      }
      throw new InternalServerErrorException("Failed to update user")
    } catch (error) {
      return error;
    }
  }

  async remove(_id: string) {
    try {
      await this.findOne(_id);
      let deletedUser = await this.userModel.deleteOne({ _id });
      if (deletedUser) {
        return "User deleted successfully"
      }
      throw new InternalServerErrorException('Failed to delete user')
    } catch (error) {
      return error
    }
  }
}
