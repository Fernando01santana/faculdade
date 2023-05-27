import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './config/typeOrmMudule';
import { AddresssModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule,
    UsersModule,
    AddresssModule,
  ],
})
export class AppModule {}
