import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Address } from '../modules/address/entities/address.entity';
import { User } from '../modules/users/entities/users.entity';

config();
let configService = new ConfigService();
export const dataSourceConfig = new DataSource({
  type: 'postgres',
  host: configService.get('RDS_HOST'),
  port: configService.get('RDS_PORT'),
  username: configService.get('RDS_USERNAME'),
  password: configService.get('RDS_PASSWORD'),
  database: configService.get('RDS_DATABASE'),
  entities: [User, Address],
  migrations: ['dist/shared/migrations/*.js'],
  synchronize: false,
});
