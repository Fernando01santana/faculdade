/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { CreateAddress } from '../dto/create.dto';
import { Address } from '../entities/Address.entity';
import { AddressRepositorie } from '../repositories/address.repositorie';

@Controller('/address')
export class AddressController {
  constructor(private readonly addressRepository: AddressRepositorie) {}
  @Post('/')
  async create(@Body() data: CreateAddress): Promise<Address> {
    return this.addressRepository.create(data);
  }
}
