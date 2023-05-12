import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Token de autenticação não fornecido',
      });
    }

    // Aqui você pode adicionar lógica adicional para validar o token, como verificar sua validade ou autenticidade

    next();
  }
}
