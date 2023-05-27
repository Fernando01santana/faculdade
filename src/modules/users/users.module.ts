import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import RedisService from '../../shared/redis/redis';
import StringToDate from '../../shared/utils/stringToDate';
import { StorageS3 } from '../../shared/utils/uploadFile';
import { Address } from '../address/entities/address.entity';
import { AddressRepositorie } from '../address/repositories/address.repositorie';
import { AddressService } from '../address/services/address.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/users.entity';
import { UsersRepository } from './repositories/user.repositorie';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address]), StringToDate],
  controllers: [UsersController],
  providers: [
    UsersService,
    AddressService,
    AddressRepositorie,
    StringToDate,
    UsersRepository,
    StorageS3,
    // RedisService,
  ],
  exports: [UsersModule, TypeOrmModule.forFeature([User, Address])],
})
export class UsersModule {}
