import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionS3ErrorUpload extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class ExceptionS3ErrorRemoveFile extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
