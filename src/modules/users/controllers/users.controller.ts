/*
https://docs.nestjs.com/controllers#controllers
*/

import { ServerUnaryCall } from '@grpc/grpc-js';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { Metadata } from 'aws-sdk/clients/appstream';
import { StorageS3 } from '../../../shared/utils/uploadFile';
import { CreateUser } from '../dtos/create.dto';
import { User } from '../entities/users.entity';
import { UsersService } from '../services/users.service';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly awsService: StorageS3,
  ) {}

  @GrpcMethod('UserService', 'Create')
  create(data, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    return this.usersService.create(data);
  }

  @GrpcMethod('UserService', 'List')
  @Get()
  async list(metadata: Metadata, call: ServerUnaryCall<any, any>) {
    const data = await this.usersService.list();
    console.log(data);

    return data;
  }

  @GrpcMethod('UserService', 'Update')
  async update(@Body() data: CreateUser, @Param('id') id): Promise<User> {
    const user = await this.usersService.update(data, id);
    return user;
  }

  @Delete('/:id')
  @GrpcMethod('UserService', 'Remove')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post('/image/:id')
  @GrpcMethod('UserService', 'UploadImageProfile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id,
  ): Promise<{ url: string }> {
    const url = await this.usersService.uploadImageProfile(file, id);
    return { url };
  }

  @Delete('/image/:id')
  @GrpcMethod('UserService', 'RemoveImageProfile')
  async removeImage(@Param('id') id): Promise<void> {
    await this.usersService.removeImageProfile(id);
    return;
  }
}
