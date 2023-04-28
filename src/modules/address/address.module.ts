import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './controllers/address.controller';
import { Address } from './entities/Address.entity';
import { AddressRepositorie } from './repositories/address.repositorie';
import { AddressService } from './services/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressService, AddressRepositorie],
  exports: [AddressService],
})
export class AddresssModule {}
