import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from './config/typeOrmMudule';
import { AddresssModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 1,
    }),
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
      ttl: 1,
      limit: 1,
    }),
  ],
})
export class AppModule {}
