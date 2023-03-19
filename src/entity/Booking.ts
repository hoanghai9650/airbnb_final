import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from './Room';
import { User } from './User';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: false })
  id: number;

  @Column({ name: 'room_id', type: 'int' })
  roomId: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @CreateDateColumn({ type: 'timestamp', name: 'arrived_date' })
  arrivedDate: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'leave_date' })
  leaveDate: Date;

  @Column({ name: 'num_guest', type: 'int' })
  numOfGuests: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Room, (room) => room.location, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  room: Room[];

  @ManyToOne(() => User, (user) => user.booking, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User[];
}
