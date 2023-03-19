import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Booking } from 'src/entity/Booking';
import { Repository } from 'typeorm';
import { notFoundCode } from 'src/utils/response';
import { successCode, failCode } from '../utils/response';
import { CreateBookingDTO } from './dto/booking.dto';
import { User } from 'src/entity/User';
import { Room } from 'src/entity/Room';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  getBooking() {
    return this.bookingRepository.find({});
  }

  async findBooking(id: number) {
    const booking = await this.bookingRepository.findOneBy({ id: id });
    if (booking) {
      return booking;
    } else {
      notFoundCode('Room not found');
    }
  }

  async findUser(id: number) {
    const findUser = await this.userRepository.findOneBy({ id: id });
    if (findUser) {
      return findUser;
    } else {
      notFoundCode('User not found');
    }
  }

  async findRoom(id: number) {
    const room = await this.roomRepository.findOneBy({ id: id });
    if (room) {
      return room;
    } else {
      notFoundCode('Room not found');
    }
  }

  async getBookingById(id: number) {
    const findBooking = await this.findBooking(id);
    if (!!findBooking) {
      successCode({ findBooking }, 'Booking found');
    }
  }

  async createBooking(payload: CreateBookingDTO) {
    const user = await this.findUser(payload.userId);
    const room = await this.findRoom(payload.roomId);

    if (!!user && !!room) {
      const newBooking = this.bookingRepository.create(payload);
      if (newBooking) {
        await this.bookingRepository.save(newBooking);
        successCode({ newBooking }, 'Booking saved');
      } else {
        failCode({}, 'User or Room not found');
      }
    }
  }

  async updateBooking(id: number, payload: CreateBookingDTO) {
    const user = await this.findUser(payload.userId);
    const room = await this.findRoom(payload.roomId);

    if (!!user && !!room) {
      const newBooking = await this.bookingRepository.update(
        { id },
        { ...payload },
      );

      successCode({ newBooking }, 'Update saved');
    }
  }

  async deleteBooking(id: number) {
    const booking = await this.findBooking(id);
    if (!!booking) {
      await this.bookingRepository.delete({ id: id });
      successCode(null, 'Deleted successfully');
    } else {
      notFoundCode('Location not found');
    }
  }

  async getBookingByUserId(id: number) {
    const user = await this.findUser(id);
    if (user) {
      await this.bookingRepository.findOneBy({ userId: id });
    }
  }
}
