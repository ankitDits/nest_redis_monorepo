import { Module } from '@nestjs/common'; // Import necessary module from NestJS
import { CourseController } from './course.controller'; // Import the CourseController
import { CourseService } from './course.service'; // Import the CourseService
import { ClientsModule, Transport } from '@nestjs/microservices'; // Import necessary modules for working with microservices
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule for handling environment variables

@Module({
  imports: [
    // Import ConfigModule to load environment variables from a file
    ConfigModule.forRoot({
      envFilePath: '.env', // Specify the path to the environment file
    }),
    // Register a microservice client with a name and configuration
    ClientsModule.register([
      {
        name: 'course_queue', // Name of the microservice client
        transport: Transport.REDIS, // Specify the transport protocol (Redis)
        options: {
          port: +process.env.REDIS_PORT, // Redis port obtained from environment variables
          host: process.env.REDIS_HOST // Redis host obtained from environment variables
        },
      },
    ]),
  ],
  controllers: [CourseController], // Define controllers that belong to this module
  providers: [CourseService], // Define providers (services) that belong to this module
})
export class CourseModule { } // Define the CourseModule class
