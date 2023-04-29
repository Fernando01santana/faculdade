import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import StringToDate from '../../../shared/utils/stringToDate';
import { CreateUser } from '../dtos/create.dto';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly stringToDate: StringToDate,
  ) {}

  //CREATE: cria um usuario no sistema e vincula o address a esse usuario x
  async create(data: any): Promise<User> {
    try {
      const userCreate = this.usersRepository.create(data);
      await this.usersRepository.save(userCreate);
      return userCreate[0];
    } catch (error) {
      throw error;
    }
  }

  //LIST: lista todos os usuarios dos sistema
  async list(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  //UPDATE: atualiza um usuario
  async update(data: CreateUser, id: string): Promise<User> {
    const user = await this.findOne(id);
    user.name = data.name;
    user.email = data.email;
    user.document = data.document;
    user.date_birth = this.stringToDate.convert(data.date_birth);

    this.usersRepository.save(user);
    return user;
  }

  async remove(user: User): Promise<void> {
    await this.usersRepository.delete(user);
    return;
  }
}
