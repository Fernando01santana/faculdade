import { Address } from 'src/modules/address/entities/Address.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column()
  email: string;

  @Column()
  date_birth: Date;

  @OneToOne(() => Address)
  @JoinColumn()
  address_id: Address;
}
