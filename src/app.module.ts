import { Module } from '@nestjs/common';
import { TypeOrmModule } from './config/datasource/typeOrmModule';

@Module({
  imports: [TypeOrmModule],
})
export class AppModule {}
