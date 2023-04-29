/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { AddressRepositorie } from 'src/modules/address/repositories/address.repositorie';
import StringToDate from 'src/shared/utils/stringToDate';
import { CreateUser } from '../dtos/create.dto';
import { User } from '../entities/users.entity';
import { UsersRepository } from '../repositories/user.repositorie';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly addressRepository: AddressRepositorie,
    private stringToDate: StringToDate,
  ) {}
  async create(data: CreateUser): Promise<User[]> {
    try {
      const address = await this.addressRepository.create(data.address);

      const createUser = {
        address_id: address,
        date_birth: this.stringToDate.convert(data.date_birth),
        document: data.document,
        email: data.email,
        name: data.name,
      };

      const user = await this.usersRepository.create(createUser);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async list(): Promise<User[]> {
    return this.usersRepository.list();
  }

  async update(data: User, id: string): Promise<User> {
    return this.usersRepository.update(data, id);
  }
}
