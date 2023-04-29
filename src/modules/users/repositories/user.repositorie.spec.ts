import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  userCreate,
  userCreateRepository,
  userCreatedService,
} from '../../../shared/constantes/constantesTest';
import StringToDate from '../../../shared/utils/stringToDate';
import { User } from '../entities/users.entity';
import { UsersRepository } from './user.repositorie';

describe('UserRepositorie', () => {
  let repository: Repository<User>;
  let usersRepository: UsersRepository;
  let stringToDate: StringToDate;

  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getRepositoryToken(User),
          useFactory: mockRepository,
        },
        {
          provide: StringToDate,
          useValue: {
            convert: jest.fn(),
          },
        },
      ],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
    stringToDate = module.get<StringToDate>(StringToDate);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('Should create user using repositorie', () => {
    it('Create user by respository', async () => {
      jest
        .spyOn(repository, 'create')
        .mockResolvedValue(userCreatedService as never);
      const result = await usersRepository.create(userCreateRepository);
      expect(result).toEqual(userCreatedService[0]);
    });

    it('should return an array of users', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue(userCreatedService);

      const result = await usersRepository.list();

      expect(result).toEqual(userCreatedService);
    });

    it('should return one user', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(userCreatedService[0]);
      const result = await usersRepository.findOne('1');
      expect(result).toEqual(userCreatedService[0]);
    });

    it('should remove one user from database', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await usersRepository.remove(userCreatedService[0]);
      expect(repository.delete).toHaveBeenCalledWith(userCreatedService[0]);
    });

    it('should update one user from database', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(userCreatedService[0]);

      jest
        .spyOn(stringToDate, 'convert')
        .mockResolvedValue(new Date('2023-04-29T13:59:27.091Z') as never);

      const result = await usersRepository.update(
        userCreate,
        userCreatedService[0].id,
      );
      expect(result).toEqual(userCreatedService[0]);
    });
  });
});
