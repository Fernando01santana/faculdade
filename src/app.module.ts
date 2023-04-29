import { Module } from '@nestjs/common';
// import { TypeOrmModule } from './config/datasource/typeOrmModule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddresssModule } from './modules/address/address.module';
import { Address } from './modules/address/entities/address.entity';
import { User } from './modules/users/entities/users.entity';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('RDS_HOST'),
        port: configService.get('RDS_PORT'),
        username: configService.get('RDS_USERNAME'),
        password: configService.get('RDS_PASSWORD'),
        database: configService.get('RDS_DATABASE'),
        entities: [User, Address],
        migrations: ['dist/shared/migrations/*.js'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AddresssModule,
  ],
})
export class AppModule {}
