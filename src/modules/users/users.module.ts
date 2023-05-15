import { Module } from '@nestjs/common';
import { ProxyRMQModule } from '../clientProxy/clientProxy.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [ProxyRMQModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
