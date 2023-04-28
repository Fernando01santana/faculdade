import { CreateUser } from '../../dtos/create.dto';
import { User } from '../../entities/users.entity';

export default interface UsersRepositorieInterface {
  create(data: CreateUser): Promise<User>;
}
