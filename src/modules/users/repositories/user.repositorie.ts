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
  //LIST: lista todos os usuarios dos sistema
  async list(): Promise<User[]> {
    try {
      return this.usersRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }
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

  async findOne(id: string): Promise<User> {
    try {
      return this.usersRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findDocument(document: string): Promise<User> {
    try {
      return this.usersRepository.findOne({ where: { document: document } });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //UPDATE: atualiza um usuario
  async update(data: CreateUser, id: string): Promise<User> {
    try {
      const user = await this.findOne(id);
      user.name = data.name;
      user.email = data.email;
      user.document = data.document;
      user.date_birth = this.stringToDate.convert(data.date_birth);

      this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateImageProfile(link_image: string, id: string): Promise<User> {
    try {
      const user = await this.findOne(id);
      user.link_image = link_image;
      this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(user: User): Promise<void> {
    try {
      await this.usersRepository.remove(user);
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByEmail(email: string): Promise<User[]> {
    try {
      const user = await this.usersRepository.find({ where: { email: email } });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
