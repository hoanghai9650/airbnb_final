import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentDTO } from './dto/comment.dto';

@Controller('comment')
@ApiTags('Comment')
@ApiBearerAuth()
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  getComment() {
    return this.commentService.getComment();
  }

  @Post()
  @ApiConsumes('application/json')
  postComment(@Body() comment: CommentDTO) {
    return this.commentService.postComment(comment);
  }

  @Put(':id')
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() comment: CommentDTO,
  ) {
    return this.commentService.updateComment(id, comment);
  }

  @Delete(':id')
  deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.deleteComment(id);
  }

  @Get('by-room/:id')
  getCommentByRoomId(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.getCommentByRoomId(id);
  }
}
