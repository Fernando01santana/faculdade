import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
// import { TypeOrmModule } from './config/datasource/typeOrmModule';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from './config/typeOrmMudule';
import { AddresssModule } from './modules/address/address.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule,
    UsersModule,
    AddresssModule,
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          url: 'redis://localhost:6379',
        },
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
})
export class AppModule {}
