import { User } from 'src/modules/users/entities/users.entity';

export const userCreatedService: User[] = [
  {
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
  },
];

export const userUpdated: User = {
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
export const userCreate = {
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

export const userCreateRepository = {
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
  date_birth: new Date(),
};
