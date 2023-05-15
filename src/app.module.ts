import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProxyRMQModule } from './modules/clientProxy/clientProxy.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    ProxyRMQModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
