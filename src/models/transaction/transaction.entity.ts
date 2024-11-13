import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @Column('date')
  transaction_date: string;

  @Column('varchar', {
    length: 255,
  })
  transaction_name: string;

  @Column('float')
  transaction_amount: number;

  @ManyToOne(() => Category, category => category.transaction)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => User, user => user.transaction)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
