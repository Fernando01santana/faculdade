import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import StringToDate from 'src/shared/utils/stringToDate';
import { Address } from '../address/entities/address.entity';
import { AddressRepositorie } from '../address/repositories/address.repositorie';
import { AddressService } from '../address/services/address.service';
import { GetAddress } from '../address/services/getAddress.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/users.entity';
import { UsersRepository } from './repositories/user.repositorie';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AddressService,
    AddressRepositorie,
    StringToDate,
    UsersRepository,
    GetAddress,
  ],
  exports: [UsersService],
})
export class UsersModule {}
