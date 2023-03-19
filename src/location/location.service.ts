import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from 'src/entity/Location';
import { failCode, notFoundCode, successCode } from 'src/utils/response';
import { Like, Repository } from 'typeorm';
import { CreateLocationDTO, SearchLocationDTO } from './dto/location.dto';
import { paginateResponse } from 'src/utils/paginateResponse';
import { readFile, unlinkSync } from 'fs';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  getLocation() {
    return this.locationRepository.find({});
  }

  async findLocation(id: number) {
    const findLocation = await this.locationRepository.findOneBy({ id: id });
    if (findLocation) {
      return findLocation;
    } else {
      notFoundCode('Location not found');
    }
  }

  async createLocation(payload: CreateLocationDTO) {
    const location = await this.locationRepository.findOneBy({
      id: payload.id,
    });

    if (!!location) {
      failCode({}, 'Location Exist');
    } else {
      const newLocation = this.locationRepository.create(payload);
      await this.locationRepository.save(newLocation);
      successCode({}, 'Create successfully');
    }
  }

  async searchLocation(query: SearchLocationDTO) {
    const take = query.pageSize || 10;
    const page = query.pageIndex || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';

    const data = await this.locationRepository.findAndCount({
      where: { name: Like('%' + keyword + '%') },
      order: { name: 'DESC' },
      take: take,
      skip: skip,
    });

    paginateResponse(data, page, take);
  }

  async updateLocation(id: number, payload: CreateLocationDTO) {
    const location = await this.findLocation(id);
    if (!!location) {
      await this.locationRepository.update({ id: id }, { ...payload });
      successCode(null, 'Updated successfully');
    } else {
      return notFoundCode('Location not found');
    }
  }

  async deleteLocation(id: number) {
    const location = await this.findLocation(id);
    if (!!location) {
      await this.locationRepository.delete({ id: id });
      successCode(null, 'Deleted successfully');
    } else {
      notFoundCode('Location not found');
    }
  }

  async uploadImage(file: Express.Multer.File, id: number) {
    const location = await this.findLocation(id);
    if (!!location) {
      readFile(
        process.cwd() + '/public/img/' + file.filename,
        async (err, data) => {
          const fileName = `"data: ${file.mimetype}; base64, ${Buffer.from(
            data,
          ).toString('base64')}"`;
          unlinkSync(process.cwd() + '/public/img/' + file.filename);
          await this.locationRepository.update({ id: id }, { image: fileName });
        },
      );
    } else {
      notFoundCode('Room not found');
    }
  }
}
