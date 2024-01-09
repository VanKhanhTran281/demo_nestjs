/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column,OneToMany,ManyToOne,JoinColumn } from 'typeorm';
import { Phone } from 'src/phone/phone.entity';
import { Role } from 'src/role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  roleId: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @OneToMany(() => Phone, phone => phone.user)
  phone: Phone[];
}