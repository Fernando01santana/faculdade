import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

export class ClientProxyApplication {
  private clientAdminBackend: ClientProxy;

  getClientProxyProductsAPI(): ClientProxy {
    return (this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI],
        queue: 'users-microservice',
      },
    }));
  }
}
