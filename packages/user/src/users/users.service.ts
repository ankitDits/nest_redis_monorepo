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

  /**
    * @param createCourseDto: CreateUserDto
    * @returns object of newly created user
    * @throws InternalServerErrorException if user creation fails
    * @description this function is used to save user into the database
    * @DevelopedBy Ankit Thakur
  */
  async create(createUserDto: CreateUserDto) {
    try {
      // Attempt to create a new user using the provided DTO
      let createdUser = await this.userModel.create(createUserDto);
      // Check if the user was successfully created
      if (createdUser) {
        // If user creation was successful, return the created user
        return createdUser
      }
      // If user creation fails for any reason, throw an InternalServerErrorException
      throw new InternalServerErrorException("Failed to create user")
    } catch (error) {
      // If an error occurs during the user creation process, log the error message
      return error
    }
  }


  /**
    * @returns array of user's objects
    * @description this function is used all users from the database
    * @DevelopedBy Ankit Thakur
  */
  async findAll() {
    try {
      // Attempt to find all users in the database
      let allUsers = await this.userModel.find();

      // Check if any users were found
      if (allUsers.length) {
        // If users were found, return them
        return allUsers;
      }

      // If no users were found, return a message indicating that no data was found
      return "No Data Found";
    } catch (error) {
      // If an error occurs during the find operation, throw the error
      throw error;
    }
  }

  /**
 * Find a user by ID
 * @param _id The ID of the user to find
 * @returns The found user if exists
 * @throws NotFoundException if user is not found
 * @throws Error if an error occurs during the retrieval process
 * @DevelopedBy Ankit Thakur
 */
  async findOne(_id: string) {
    try {
      // Attempt to find a user by ID in the database
      let isUserExist = await this.userModel.findOne({ _id });

      // Check if the user exists
      if (isUserExist) {
        // If user exists, return it
        return isUserExist;
      }

      // If user does not exist, throw a NotFoundException
      throw new NotFoundException("User not found");
    } catch (error) {
      // If an error occurs during the find operation, throw the error
      throw error;
    }
  }


  /**
 * Update a user by ID
 * @param _id The ID of the user to update
 * @param updateUserDto The data to update the user with
 * @returns The updated user if successful
 * @throws NotFoundException if user to update is not found
 * @throws InternalServerErrorException if user update fails
 * @DevelopedBy Ankit Thakur
 */
  async update(_id: string, updateUserDto: UpdateUserDto) {
    try {
      // Check if the user to update exists
      await this.findOne(_id);

      // Attempt to update the user in the database
      let updatedUser = await this.userModel.findOneAndUpdate({ _id }, { ...updateUserDto });

      // Check if the user was successfully updated
      if (updatedUser) {
        // If user update was successful, return the updated user
        return updatedUser;
      }

      // If user update fails for any reason, throw an InternalServerErrorException
      throw new InternalServerErrorException("Failed to update user");
    } catch (error) {
      // If an error occurs during the update process, return the error
      return error;
    }
  }


  /**
 * Remove a user by ID
 * @param _id The ID of the user to remove
 * @returns Success message if user is deleted successfully
 * @throws NotFoundException if user to remove is not found
 * @throws InternalServerErrorException if user deletion fails
 * @DevelopedBy Ankit Thakur
 */
  async remove(_id: string) {
    try {
      // Check if the user to remove exists
      await this.findOne(_id);

      // Attempt to delete the user from the database
      let deletedUser = await this.userModel.deleteOne({ _id });

      // Check if the user was successfully deleted
      if (deletedUser) {
        // If user deletion was successful, return success message
        return "User deleted successfully";
      }

      // If user deletion fails for any reason, throw an InternalServerErrorException
      throw new InternalServerErrorException('Failed to delete user');
    } catch (error) {
      // If an error occurs during the deletion process, return the error
      return error;
    }
  }

}
