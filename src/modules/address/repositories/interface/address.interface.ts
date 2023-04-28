import { CreateAddress } from '../../dto/create.dto';
import { Address } from '../../entities/address.entity';

export default interface AddressRepositorieInterface {
  create(data: CreateAddress): Promise<Address>;
}
