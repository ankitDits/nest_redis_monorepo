import { NestFactory } from '@nestjs/core'; // Import necessary module from NestJS
import { AppModule } from './app.module'; // Import the root module of the application

// Bootstrap function to start the NestJS application
async function bootstrap() {
  // Create an instance of the Nest application by passing the AppModule
  const app = await NestFactory.create(AppModule);

  // Set a global prefix for all routes in the application
  app.setGlobalPrefix('api/v1');

  // Start the Nest application and listen for incoming HTTP requests on port 3000
  await app.listen(3000);
}

// Call the bootstrap function to start the application
bootstrap();
