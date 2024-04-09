import { IsNotEmpty, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString({ message: "name must be string" })
    @IsNotEmpty({ message: "name is required" })
    name: string

    @IsString({ message: "description must be string" })
    @IsNotEmpty({ message: "description is required" })
    description: string

    @IsString({ message: "category must be string" })
    @IsNotEmpty({ message: "category is required" })
    category: string

    @IsString({ message: "user must be string" })
    @IsNotEmpty({ message: "user is required" })
    user: string
}
