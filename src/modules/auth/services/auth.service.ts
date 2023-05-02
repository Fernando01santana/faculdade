/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../../users/repositories/user.repositorie';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async login(data: any): Promise<any> {
    const user = await this.usersRepository.findByEmail(data.email);

    if (user.length != 1) {
      throw new Error('Usuario nao encontrado');
    }
    const payload = { email: data.emal };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }
}
