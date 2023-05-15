import { IsNotEmpty, IsString } from 'class-validator';
class CreateAddress {
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

export class CreateUser {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  date_birth: string;

  @IsNotEmpty()
  address: CreateAddress;
}
