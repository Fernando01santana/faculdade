import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/modules/address/entities/address.entity';
import StringToDate from 'src/shared/utils/stringToDate';
import { Repository } from 'typeorm';
import { CreateUser } from '../dtos/create.dto';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addresRepository: Repository<Address>,
    private stringToDate: StringToDate,
  ) {}
  async create(data: CreateUser): Promise<User> {
    //salva endereco do usuario
    try {
      console.log(data);

      const createAddress = this.addresRepository.create(data.address);
      await this.addresRepository.save(createAddress);
      console.log(createAddress);

      const user = {
        // address_id: createAddress,
        date_birth: this.stringToDate.convert(data.date_birth),
        document: data.document,
        email: data.email,
        name: data.name,
      };

      const userCreate = this.usersRepository.create(user);
      await this.usersRepository.save(userCreate);
      return userCreate;
    } catch (error) {
      throw error;
    }
  }
}
