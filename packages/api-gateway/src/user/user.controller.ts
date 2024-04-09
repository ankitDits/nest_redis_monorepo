import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

/**
 * 
 * @param req 
 * @returns 
 */
  @Post('create')
  async create(@Body() req: CreateUserDto) {
    return this.userService.create(req);
  }

  @Get(':_id')
  async getById(@Param() _id: string) {
    return await this.userService.getById(_id);
  }

  @Get('')
  async findAll() {
    return await this.userService.findAll();
  }

  @Put(':_id')
  async update(@Param() _id: string, @Body() data: UpdateUserDto) {
    return await this.userService.update(_id, data);
  }

  @Delete(':_id')
  async remove(@Param() _id: string) {
    return await this.userService.remove(_id);
  }
}
