import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAddress } from 'src/modules/address/dto/create.dto';

export class CreateUser {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsString()
  email: string;

  @IsString()
  date_birth: string;

  @IsNotEmpty()
  address: CreateAddress;
}
