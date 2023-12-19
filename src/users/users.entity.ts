/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { Phone } from 'src/phone/phone.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @OneToMany(() => Phone, phone => phone.user)
  phone: Phone[];
}