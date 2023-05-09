import { HttpException, HttpStatus } from '@nestjs/common';

//erro interno
export class ExceptionInternalError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
//usuario nao encontrado
export class ExceptionUserNotFount extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
