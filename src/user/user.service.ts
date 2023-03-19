import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Like, Repository } from 'typeorm';
import { CreateUserDTO_2, SearchUserDTO, UpdateUserDTO } from './dto/updateDTO';
import { notFoundCode } from 'src/utils/response';
import { successCode, failCode } from '../utils/response';
import { paginateResponse } from 'src/utils/paginateResponse';
import { readFile, unlinkSync } from 'fs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUser() {
    return this.userRepository.find();
  }

  async findUser(id: number) {
    const findUser = await this.userRepository.findOneBy({ id: id });
    if (findUser) {
      return findUser;
    } else {
      notFoundCode('User not found');
    }
  }

  async updateUserById(id: number, body: UpdateUserDTO) {
    const findUser = await this.findUser(id);
    if (!!findUser) {
      await this.userRepository.update({ id }, { ...body });
      successCode(null, 'Updated successfully');
    } else {
      notFoundCode('User not found');
    }
  }

  async updateUser(payload: CreateUserDTO_2) {
    const id = payload.id;
    const findUser = await this.findUser(id);

    if (!!findUser) {
      await this.userRepository.update({ id }, { ...payload });

      successCode(null, 'Updated successfully');
    } else {
      notFoundCode('User not found');
    }
  }

  async deleteUser(id: number) {
    const findUser = await this.findUser(id);
    if (!!findUser) {
      await this.userRepository.delete({ id });
      successCode(null, 'Deleted successfully');
    } else {
      notFoundCode('User not found');
    }
  }

  async searchUser(query: SearchUserDTO) {
    const take = query.pageSize || 10;
    const page = query.pageIndex || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';

    const data = await this.userRepository.findAndCount({
      where: { email: Like('%' + keyword + '%') },
      order: { email: 'DESC' },
      take: take,
      skip: skip,
    });

    paginateResponse(data, page, take);
  }

  async getUserByName(name: string) {
    const user = await this.userRepository.findOneBy({ name: name });

    if (!!user) {
      successCode(user, 'Success');
    } else {
      notFoundCode('User Not Found');
    }
  }

  async uploadAvatar(file: Express.Multer.File, userId: number) {
    readFile(
      process.cwd() + '/public/img/' + file.filename,
      async (err, data) => {
        const fileName = `"data: ${file.mimetype}; base64, ${Buffer.from(
          data,
        ).toString('base64')}"`;
        unlinkSync(process.cwd() + '/public/img/' + file.filename);
        await this.userRepository.update({ id: userId }, { avatar: fileName });
      },
    );
  }
}
