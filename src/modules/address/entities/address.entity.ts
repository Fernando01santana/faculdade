import { User } from 'src/modules/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zip_code: string;

  @Column()
  state: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @OneToMany(() => User, (user) => user.address_id)
  user: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
