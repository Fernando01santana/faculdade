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
} from '@nestjs/common';
import { CreateUser } from '../dtos/create.dto';
import { User } from '../entities/users.entity';
import { UsersService } from '../services/users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  async create(@Body() data: CreateUser): Promise<User[]> {
    const user = await this.usersService.create(data);
    return user;
  }

  @Get('/list')
  async list(): Promise<User[]> {
    const user = await this.usersService.list();
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
}
