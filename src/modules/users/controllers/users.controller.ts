/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @EventPattern('create-user')
  @Post('/')
  async create(
    @Payload() data: CreateUser,
    @Ctx() context: RmqContext,
  ): Promise<User> {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    await channel.ack(message);

    const user = await this.usersService.create(data);
    return user;
  }
  @EventPattern('list-users')
  @Get('/list')
  async list(@Payload() id: any, @Ctx() context: RmqContext): Promise<User[]> {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    await channel.ack(message);

    const user = await this.usersService.list(id.id);
    return user;
  }

  @Put('/update/:id')
  async update(@Body() data: CreateUser, @Param('id') id): Promise<User> {
    const user = await this.usersService.update(data, id);
    return user;
  }

  @Delete('/remove/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post('/image/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id,
  ): Promise<{ url: string }> {
    const url = await this.usersService.uploadImageProfile(file, id);
    return { url };
  }

  @Delete('/image/:id')
  async removeImage(@Param('id') id): Promise<void> {
    await this.usersService.removeImageProfile(id);
    return;
  }
}
