import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { dataSourceConfig } from './dataSource';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        await dataSourceConfig.initialize();
        return dataSourceConfig;
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
