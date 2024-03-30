import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
