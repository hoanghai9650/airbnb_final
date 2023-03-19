import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from '../entity/Booking';
import { User } from 'src/entity/User';
import { Room } from '../entity/Room';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Room])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
