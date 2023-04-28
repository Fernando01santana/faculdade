import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { dataSourceConfig } from './dataSourceConfig';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        await dataSourceConfig.initialize();
        return;
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
