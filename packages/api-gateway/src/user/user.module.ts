import { Module } from '@nestjs/common'; // Import necessary module from NestJS
import { UserController } from './user.controller'; // Import the UserController
import { UserService } from './user.service'; // Import the UserService
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
        name: 'user_queue', // Name of the microservice client
        transport: Transport.REDIS, // Specify the transport protocol (Redis)
        options: {
          port: +process.env.REDIS_PORT, // Redis port obtained from environment variables
          host: process.env.REDIS_HOST // Redis host obtained from environment variables
        },
      },
    ]),
  ],
  controllers: [UserController], // Define controllers that belong to this module
  providers: [UserService], // Define providers (services) that belong to this module
})
export class UserModule { } // Define the UserModule class
