/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity'; 

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  phone_id: number;

  @Column()
  company: string;

  @Column()
  value: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export class PhoneAdd {
  @Column()
  company: string;

  @Column()
  value: string;

  @Column()
  user_id: number;
  
  @JoinColumn({ name: 'user_id' })
  user: User;
}