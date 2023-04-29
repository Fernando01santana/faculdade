import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddress } from '../dto/create.dto';
import { Address } from '../entities/address.entity';

@Injectable()
export class AddressRepositorie {
  @InjectRepository(Address)
  private readonly addressTable: Repository<Address>;

  async create(data: CreateAddress): Promise<Address> {
    try {
      const address = this.addressTable.create(data);
      await this.addressTable.save(address);
      return address;
    } catch (error) {
      throw error;
    }
  }
}
