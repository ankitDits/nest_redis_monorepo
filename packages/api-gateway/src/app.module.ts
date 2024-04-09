import { Module } from '@nestjs/common'; // Import necessary module from NestJS
import { UserModule } from './user/user.module'; // Import the UserModule
import { CourseModule } from './course/course.module'; // Import the CourseModule

@Module({
  imports: [UserModule, CourseModule], // Modules that are imported into the current module
  controllers: [], // Controllers that are instantiated by the Nest IoC container
  providers: [], // Services that are instantiated by the Nest IoC container and made available to other modules
})
export class AppModule { } // AppModule class definition
