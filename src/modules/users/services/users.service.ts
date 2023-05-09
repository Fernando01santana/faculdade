/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import StringToDate from '../../../shared/utils/stringToDate';
import { StorageS3 } from '../../../shared/utils/uploadFile';
import { AddressRepositorie } from '../../address/repositories/address.repositorie';
import { CreateUser } from '../dtos/create.dto';
import { User } from '../entities/users.entity';
import { UsersRepository } from '../repositories/user.repositorie';

config();
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly addressRepository: AddressRepositorie,
    private stringToDate: StringToDate,
    private uploadS3: StorageS3,
  ) {}
  async create(data: CreateUser): Promise<User> {
    try {
      const address = await this.addressRepository.create(data.address);
      const date_birth = await this.stringToDate.convert(data.date_birth);
      const createUser = {
        address_id: address,
        date_birth: date_birth,
        document: data.document,
        email: data.email,
        name: data.name,
        password: data.password,
        link_image: process.env.IMAGE_DEFAULT,
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

  async update(data: CreateUser, id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne(id);
      if (!user) {
        throw new Error('usuario nao encontrado');
      }
      await this.addressRepository.update(data.address, user.address_id.id);
      return this.usersRepository.update(data, id);
    } catch (error) {
      throw new Error('Erro ao atualizar usuario: ' + error.message);
    }
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new Error('Usuario nao encontrado');
    }
    await this.usersRepository.remove(user);
    return;
  }

  async uploadImageProfile(file: any, id: string): Promise<string> {
    try {
      let user = await this.usersRepository.findOne(id);
      if (!user) {
        throw new Error('Nenhum usuario encontrado');
      }

      const link = await this.uploadS3.uploadFile(file, id);

      await this.usersRepository.updateImageProfile(link, id);
      return link;
    } catch (error) {
      throw new Error('Erro ao atualizar imagem de perfil.');
    }
  }
}
