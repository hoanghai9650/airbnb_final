import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from 'src/entity/Comment';
import { User } from 'src/entity/User';
import { Room } from '../entity/Room';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Room])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
