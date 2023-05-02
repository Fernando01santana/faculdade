import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

interface JwtPayload {
  sub: string;
  username: string;
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token de autenticação não fornecido');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);
      req.user = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Token de autenticação inválido');
    }
  }
}
