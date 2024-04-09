import { IsNotEmpty, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
export class CreateUserDto {
    @IsString({ message: 'userName must be string' })
    @IsNotEmpty({ message: 'userName is required' })
    userName: string;

    @IsString({ message: 'userEmail must be string' })
    @IsNotEmpty({ message: 'userEmail is required' })
    userEmail: string;

    @IsString({ message: 'userRole must be string' })
    @IsNotEmpty({ message: 'userRole is required' })
    userRole: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }