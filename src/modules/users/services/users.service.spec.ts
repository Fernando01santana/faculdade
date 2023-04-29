import { Test } from '@nestjs/testing';
import StringToDate from '../../../shared/utils/stringToDate';
import { AddressRepositorie } from '../../address/repositories/address.repositorie';
import { User } from '../entities/users.entity';
import { UsersRepository } from '../repositories/user.repositorie';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  let addressRepository: AddressRepositorie;
  let stringToDate: StringToDate;

  let userInsertFromTests;

  const userCreatedService: User = {
    address_id: {
      id: '1',
      street: '123 Main St',
      city: 'Anytown',
      state: 'AS',
      zip_code: '12345',
      neighborhood: 'teste',
      number: '1',
      created_at: new Date(),
      updated_at: new Date(),
      user: null,
    },
    name: 'John Doe',
    email: 'johndoe@example.com',
    document: '123456789',
    date_birth: new Date(),
    id: '1',
  };

  const userUpdated: User = {
    address_id: {
      id: '1',
      street: 'updated street',
      city: 'update',
      state: 'CE',
      zip_code: '123',
      neighborhood: 'teste 1',
      number: '2',
      created_at: new Date(),
      updated_at: new Date(),
      user: null,
    },
    name: 'Mario Bros',
    email: 'johndoe@example.com',
    document: '00000',
    date_birth: new Date(),
    id: '1',
  };
  const userCreate = {
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'AS',
      zip_code: '12345',
      neighborhood: 'teste',
      number: '1',
    },
    name: 'John Doe',
    email: 'johndoe@example.com',
    document: '123456789',
    date_birth: '17/06/2001',
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn(),
            list: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: AddressRepositorie,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: StringToDate,
          useValue: {
            convert: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    addressRepository = moduleRef.get<AddressRepositorie>(AddressRepositorie);
    stringToDate = moduleRef.get<StringToDate>(StringToDate);
  });

  describe('Create user', () => {
    it('should create a user', async () => {
      const address = {
        id: '1',
        street: '123 Main St',
        city: 'Anytown',
        state: 'AS',
        zip_code: '12345',
        neighborhood: 'teste',
        number: '1',
        user: null,
        created_at: new Date('2023-04-29T13:59:27.091Z'),
        updated_at: new Date('2023-04-29T13:59:27.091Z'),
      };

      const data = {
        address_id: address,
        date_birth: new Date('2023-04-29T13:59:27.091Z'),
        document: '123456789',
        email: 'johndoe@example.com',
        name: 'John Doe',
      };

      const dataReturn = {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        document: '123456789',
        date_birth: new Date('2023-04-29T13:59:27.091Z'),
        address_id: address,
      };

      const birth_date = new Date('2023-04-29T13:59:27.091Z');

      jest
        .spyOn(stringToDate, 'convert')
        .mockResolvedValue(birth_date as never);
      jest.spyOn(addressRepository, 'create').mockResolvedValue(address);
      jest.spyOn(usersRepository, 'create').mockResolvedValue(dataReturn);

      const result = await usersService.create(userCreate);

      expect(addressRepository.create).toBeDefined();
      expect(usersRepository.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(dataReturn);
    });
  });

  describe('List all users', () => {
    it('should return all users in database', async () => {
      jest
        .spyOn(usersRepository, 'list')
        .mockResolvedValue([userCreatedService]);

      const result = await usersService.list();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Remove one user', () => {
    it('Remove user', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockResolvedValue(userCreatedService);

      jest.spyOn(usersRepository, 'remove').mockResolvedValue(null);
      const result = await usersService.remove(userCreatedService.id);
      expect(result).toBeNull();
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(undefined);

      await expect(usersService.remove('1')).rejects.toThrowError(
        'Usuario nao encontrado',
      );
      expect(usersRepository.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('Update user', () => {
    it('Shold return user and return user updated', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockResolvedValue(userCreatedService);
      jest.spyOn(usersRepository, 'update').mockResolvedValue(userUpdated);
      jest
        .spyOn(addressRepository, 'update')
        .mockResolvedValue(userUpdated.address_id);

      const result = await usersService.update(
        userCreate,
        userCreatedService.id,
      );
      expect(result).toBeDefined();
    });

    it('Shold return error and return user not found', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(undefined);

      await expect(usersService.update(null, '1')).rejects.toThrowError(
        'Erro ao atualizar usuario: usuario nao encontrado',
      );
      expect(usersRepository.findOne).toHaveBeenCalledWith('1');
    });
  });
});
