import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Room {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: false })
  id: number;

  @Column('varchar', { name: 'name', length: 255, nullable: true })
  name: string;

  @Column({ name: 'num_guest', type: 'int' })
  guest: number;

  @Column({ name: 'bedroom', type: 'int' })
  bedroom: number;

  @Column({ name: 'bed', type: 'int' })
  bed: number;

  @Column({ name: 'bathroom', type: 'int' })
  bathroom: number;

  @Column('varchar', { name: 'description', length: 255, nullable: true })
  description: string;

  @Column({ type: 'int', name: 'price' })
  price: number;

  @Column({ type: 'boolean', name: 'washer', nullable: true })
  washer: boolean;

  @Column({ type: 'boolean', name: 'ironing', nullable: true })
  ironing: boolean;

  @Column({ type: 'boolean', name: 'television', nullable: true })
  television: boolean;

  @Column({ type: 'boolean', name: 'conditioner', nullable: true })
  conditioner: boolean;

  @Column({ type: 'boolean', name: 'wifi', nullable: true })
  wifi: boolean;

  @Column({ type: 'boolean', name: 'kitchen', nullable: true })
  kitchen: boolean;

  @Column({ type: 'boolean', name: 'parking', nullable: true })
  parking: boolean;

  @Column({ type: 'boolean', name: 'pool', nullable: true })
  pool: boolean;

  @Column('mediumtext', { name: 'image', nullable: true })
  image: boolean;

  @ManyToOne(() => User, (user) => user.room)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
