import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Room } from './Room';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: false })
  id: number;

  @Column('varchar', { name: 'name', length: 255, nullable: true })
  name: string;

  @Column({ type: 'int', name: 'age', unsigned: true, nullable: true })
  age: number;

  @Column('varchar', { length: 255, name: 'email', unique: true })
  email: string;

  @Exclude()
  @Column('varchar', { length: 255, name: 'password' })
  password: string;

  @Column('mediumtext', { name: 'avatar', nullable: true })
  avatar: string;

  @Column({
    type: 'int',
    name: 'phone_number',
    unsigned: true,
    nullable: true,
  })
  phoneNumber: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'date', nullable: true })
  birthDay: Date | null;

  @Column('varchar', { name: 'gender', length: 255, nullable: true })
  gender: string;

  @Column('varchar', { name: 'role', length: 255, nullable: true })
  role: string;

  @OneToMany(() => Room, (room) => room.user)
  room: Room[];
}
