import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  //CREATE: cria um usuario no sistema e vincula o address a esse usuario x
  async create(data: any): Promise<User[]> {
    try {
      const userCreate = this.usersRepository.create(data);
      await this.usersRepository.save(userCreate);
      return userCreate;
    } catch (error) {
      throw error;
    }
  }

  //LIST: lista todos os usuarios dos sistema
  async list(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async update(data: User, id: string): Promise<User> {}
}
