import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddress } from '../dto/create.dto';
import { Address } from '../entities/address.entity';

@Injectable()
export class AddressRepositorie {
  constructor(
    @InjectRepository(Address)
    private readonly addressTable: Repository<Address>,
  ) {}

  async create(data: CreateAddress): Promise<Address> {
    try {
      const address = this.addressTable.create(data);
      await this.addressTable.save(address);
      return address;
    } catch (error) {
      throw error;
    }
  }

  async update(data: CreateAddress, id: string): Promise<Address> {
    try {
      const address = await this.findOne(id);
      if (!address) {
        throw new Error('Endereco inforamdo nao encontrado');
      }
      return address;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: string): Promise<Address> {
    return this.addressTable.findOne({ where: { id: id } });
  }
}
