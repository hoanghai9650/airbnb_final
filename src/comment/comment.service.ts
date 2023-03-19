import { Injectable } from '@nestjs/common';

import { User } from '../entity/User';
import { Room } from '../entity/Room';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entity/Comment';
import { CommentDTO } from './dto/comment.dto';
import { notFoundCode, successCode, failCode } from '../utils/response';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  getComment() {
    return this.commentRepository.find({});
  }

  async findComment(id: number) {
    const findComment = await this.commentRepository.findOneBy({ id });
    if (findComment) {
      return findComment;
    } else {
      notFoundCode('Comment not found');
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

  async postComment(comment: CommentDTO) {
    const user = await this.findUser(comment.userId);
    const room = await this.findRoom(comment.roomId);
    if (!!user && !!room) {
      const newComment = this.commentRepository.create(comment);
      if (newComment) {
        await this.commentRepository.save(newComment);
        successCode({ newComment }, 'Comment saved');
      } else {
        failCode({}, 'Failed');
      }
    }
  }

  async updateComment(id: number, payload: CommentDTO) {
    const user = await this.findUser(payload.userId);
    const room = await this.findRoom(payload.roomId);

    if (!!user && !!room) {
      const newComment = this.commentRepository.update({ id }, { ...payload });

      successCode({ newComment }, 'Update saved');
    }
  }

  async deleteComment(id: number) {
    const comment = await this.findComment(id);
    if (!!comment) {
      await this.commentRepository.delete({ id: id });
      successCode(null, 'Deleted successfully');
    } else {
      notFoundCode('Location not found');
    }
  }

  async getCommentByRoomId(id: number) {
    const room = await this.findRoom(id);
    if (!!room) {
      await this.commentRepository.findOneBy({ roomId: id });
    }
  }
}
