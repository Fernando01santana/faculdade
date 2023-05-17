/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { config } from 'dotenv';
import RedisService from '../../../shared/redis/redis';
import StringToDate from '../../../shared/utils/stringToDate';
import { StorageS3 } from '../../../shared/utils/uploadFile';
import { AddressRepositorie } from '../../address/repositories/address.repositorie';
import { CreateUser } from '../dtos/create.dto';
import { User } from '../entities/users.entity';
import { UsersRepository } from '../repositories/user.repositorie';

interface messageError {
  message: string;
  statusCode: number;
}
config();
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly addressRepository: AddressRepositorie,
    private stringToDate: StringToDate,
    private uploadS3: StorageS3,
    private redis: RedisService,
  ) {}
  async create(data: CreateUser): Promise<User[] | messageError> {
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
      const userverify = await this.usersRepository.findDocument(
        createUser.document,
      );
      if (userverify) {
        return { message: 'usuario ja cadastrado no sistema', statusCode: 409 };
      }

      const dataUser = await this.usersRepository.create(createUser);
      await this.redis.createKey(dataUser);

      return dataUser;
    } catch (error) {
      throw new RpcException('Erro ao criar usuario: ' + error.message);
    }
  }

  async list(id: string): Promise<User[]> {
    if (id !== null && id !== undefined && id !== '') {
      return this.usersRepository.findOne(id)[0];
    }
    const usersByRedis = await this.redis.getAllCustomers();
    const usersByDatabase = await this.usersRepository.list();

    let users = [];
    if (usersByRedis) {
      for (let index = 0; index < usersByRedis.length; index++) {
        const element = JSON.parse(usersByRedis[index]);
        users.push(element);
      }
      return users;
    }

    for (let index = 0; index < usersByDatabase.length; index++) {
      const element = usersByDatabase[index];
      await this.redis.createKey(element);
    }
    return usersByDatabase;
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
      throw new HttpException(
        'Erro ao atualizar usuario: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const user = await this.usersRepository.findOne(id);
      if (!user) {
        throw new Error('Usuario nao encontrado');
      }
      await this.usersRepository.remove(user);
      return;
    } catch (error) {
      throw new HttpException(
        'Erro ao remover usuario: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async uploadImageProfile(file: any, id: string): Promise<string> {
    try {
      let user = await this.usersRepository.findOne(id);
      if (!user) {
        throw new Error('Nenhum usuario encontrado');
      }
      let filename = 'username-' + user.id;

      const link = await this.uploadS3.uploadFile(file, filename);

      await this.usersRepository.updateImageProfile(link, id);
      return link;
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar Imagem: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeImageProfile(id: string): Promise<void> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException('Usuario nao encontrado: ', HttpStatus.NOT_FOUND);
    }
    try {
      let filename = 'username-' + user.id;
      await this.uploadS3.removeFile(filename);
      return;
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar imagem: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
