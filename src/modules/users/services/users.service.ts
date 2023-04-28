/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CreateUser } from '../dtos/create.dto';
import { User } from '../entities/users.entity';
import { UsersRepository } from '../repositories/user.repositorie';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepositorie: UsersRepository) {}
  async create(data: CreateUser): Promise<User> {
    const user = await this.usersRepositorie.create(data);
    return user;
  }
}
