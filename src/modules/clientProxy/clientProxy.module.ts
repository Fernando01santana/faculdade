import { Module } from '@nestjs/common';
import { ClientProxyApplication } from './services/clientProxy.service';

@Module({
  providers: [ClientProxyApplication],
  exports: [ClientProxyApplication],
})
export class ProxyRMQModule {}
