import { IsString } from 'class-validator';

export class CreateAddress {
  @IsString()
  zip_code: string;

  @IsString()
  state: string;

  @IsString()
  neighborhood: string;

  @IsString()
  number: string;

  @IsString()
  street: string;

  @IsString()
  city: string;
}
