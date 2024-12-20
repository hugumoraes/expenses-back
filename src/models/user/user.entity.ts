import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column('varchar', {
    length: 255,
  })
  user_login: string;

  @Column('varchar', {
    length: 255,
  })
  user_name: string;

  @Column('varchar', {
    length: 255,
  })
  user_password: string;

  @OneToMany(() => Transaction, transaction => transaction.user)
  transaction: Transaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
