import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/entity/Room';
import { Like, Repository } from 'typeorm';
import { RoomPayloadDTO, RoomSearchDTO } from './dto/roomDTO';
import { notFoundCode, failCode, successCode } from '../utils/response';
import { paginateResponse } from 'src/utils/paginateResponse';
import { readFile, unlinkSync } from 'fs';
import { Location } from 'src/entity/Location';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  getRoom() {
    return this.roomRepository.find();
  }

  async findRoom(id: number) {
    const room = await this.roomRepository.findOneBy({ id: id });
    if (room) {
      return room;
    } else {
      notFoundCode('Room not found');
    }
  }

  async createRoom(payload: RoomPayloadDTO) {
    const room = await this.roomRepository.findOneBy({ id: payload.id });
    const location = await this.locationRepository.findOneBy({
      id: payload.locationId,
    });
    if (!!room) {
      failCode({}, 'Room already exists');
    } else {
      if (location) {
        const newRoom = this.roomRepository.create(payload);
        await this.roomRepository.save(newRoom);
        successCode({}, 'Create Success');
      } else {
        notFoundCode('Location not found');
      }
    }
  }

  async searchRoom(query: RoomSearchDTO) {
    const take = query.pageSize || 10;
    const page = query.pageIndex || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';

    const data = await this.roomRepository.findAndCount({
      where: { name: Like('%' + keyword + '%') },
      order: { name: 'DESC' },
      take: take,
      skip: skip,
    });

    paginateResponse(data, page, take);
  }

  async updateRoom(id: number, payload: RoomPayloadDTO) {
    const room = await this.findRoom(id);
    if (!!room) {
      await this.roomRepository.update({ id: id }, { ...payload });
      successCode(null, 'Updated successfully');
    } else {
      return notFoundCode('User not found');
    }
  }

  async deleteRoom(id: number) {
    const room = await this.findRoom(id);
    if (!!room) {
      await this.roomRepository.delete({ id: id });
      successCode(null, 'Deleted successfully');
    } else {
      notFoundCode('User not found');
    }
  }

  async uploadImage(file: Express.Multer.File, id: number) {
    const room = await this.findRoom(id);
    if (!!room) {
      readFile(
        process.cwd() + '/public/img/' + file.filename,
        async (err, data) => {
          const fileName = `"data: ${file.mimetype}; base64, ${Buffer.from(
            data,
          ).toString('base64')}"`;
          unlinkSync(process.cwd() + '/public/img/' + file.filename);
          await this.roomRepository.update({ id: id }, { image: fileName });
        },
      );
    } else {
      notFoundCode('Room not found');
    }
  }
}
