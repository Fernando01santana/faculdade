// import { HttpException, HttpStatus } from '@nestjs/common';
// import { Redis } from 'ioredis';

// export default class RedisService {
//   private redis = new Redis();
//   async createKey(data): Promise<any> {
//     this.redis.set(`customer:${data.id}`, JSON.stringify(data));
//   }

//   async updateKey(updatedCustomer): Promise<any> {
//     const customer = await this.redis.get(`user:${updatedCustomer.id}`);

//     if (!customer) {
//       throw new HttpException('Usuario nao encontrado', HttpStatus.NOT_FOUND);
//     }
//     await this.redis.set(
//       `customer:${updatedCustomer.id}`,
//       JSON.stringify(updatedCustomer),
//     );
//     const customerUpdated = this.redis.get(`customer:${updatedCustomer.id}`);

//     return customerUpdated;
//   }
//   async findKeyById(id: string): Promise<any> {
//     const customer = await this.redis.get(`customer:${id}`);
//     return customer;
//   }

//   async getAllCustomers(): Promise<string[]> {
//     const customerKeys = await this.redis.keys('customer*');
//     if (customerKeys.length === 0) {
//       return;
//     }

//     // Obtém os valores correspondentes às chaves encontradas
//     return await this.redis.mget(...customerKeys);
//   }
// }
