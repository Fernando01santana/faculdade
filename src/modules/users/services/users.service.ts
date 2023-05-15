import { Injectable } from '@nestjs/common';
import { ClientProxyApplication } from 'src/modules/clientProxy/services/clientProxy.service';
import { CreateUser } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private clientRpc: ClientProxyApplication) {}
  private clientProxyProductsApi = this.clientRpc.getClientProxyProductsAPI();

  async list(id: any) {
    const products = await this.clientProxyProductsApi.send(
      'list-users',
      id ? id : '',
    );
    return products;
  }

  async create(data: CreateUser) {
    return this.clientProxyProductsApi.emit('create-user', data);
  }
}
