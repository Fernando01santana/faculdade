import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
export const dataSourceConfig = new DataSource({
  type: 'postgres',
  host: process.env.RDS_HOST,
  port: parseInt(process.env.RDS_PORT),
  username: process.env.RDS_USERNAME,
  password: String(process.env.RDS_PASSWORD),
  database: process.env.RDS_DATABASE,
  entities: [],
  migrations: ['dist/shared/migrations/*.js'],
  synchronize: false,
  connectTimeoutMS: 10000,
  logger: 'simple-console',
});
