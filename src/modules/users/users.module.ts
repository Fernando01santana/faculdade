import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import StringToDate from 'src/shared/utils/stringToDate';
import { Address } from '../address/entities/address.entity';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/users.entity';
import { UsersRepository } from './repositories/user.repositorie';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, StringToDate],
  exports: [UsersService],
})
export class UsersModule {}
