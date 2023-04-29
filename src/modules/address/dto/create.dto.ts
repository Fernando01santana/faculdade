import { IsString } from 'class-validator';

export class CreateAddress {
  @IsString()
  zip_code: string;
}
