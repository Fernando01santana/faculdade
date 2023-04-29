/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CreateAddress } from '../dto/create.dto';
import { Address } from '../entities/Address.entity';
import { AddressRepositorie } from '../repositories/address.repositorie';
import { GetAddress } from './getAddress.service';

@Injectable()
export class AddressService {
  constructor(
    private readonly addressRepository: AddressRepositorie,
    private readonly getAddress: GetAddress,
  ) {}

  async create(data: CreateAddress): Promise<Address> {
    try {
      // const dataAddress = await this.getAddress.getAddressByCep(data.zip_code);
      const adress = await this.addressRepository.create(data);
      return adress;
    } catch (error) {
      throw error;
    }
  }
}
