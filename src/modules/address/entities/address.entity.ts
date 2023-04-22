import { Users } from 'src/modules/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
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

  @OneToOne(() => Users, (user) => user.address_id)
  user: Users;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
