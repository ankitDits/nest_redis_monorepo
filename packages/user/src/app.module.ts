import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import * as Joi from 'joi';
import { User, UserSchema } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
