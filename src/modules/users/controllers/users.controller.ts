import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUser } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/')
  async create(@Body() data: CreateUser) {
    const user = await this.userService.create(data);
    user.subscribe((valor) => {
      console.log(valor);
    });
    return user;
  }

  @Get()
  async getProduts(@Query() id: string) {
    return await this.userService.list(id);
  }
}
