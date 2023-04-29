import { Module } from '@nestjs/common';
// import { TypeOrmModule } from './config/datasource/typeOrmModule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './config/typeOrmMudule';
import { AddresssModule } from './modules/address/address.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule, UsersModule, AddresssModule],
})
export class AppModule {}
