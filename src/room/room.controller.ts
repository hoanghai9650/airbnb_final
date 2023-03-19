import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RoomService } from './room.service';
import { RoomPayloadDTO, RoomSearchDTO } from './dto/roomDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/imageUtils';
import { FileUploadDTO } from 'src/user/dto/updateDTO';

@Controller('room')
@ApiTags('Room')
@ApiBearerAuth()
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  getRoom() {
    return this.roomService.getRoom();
  }

  @Post()
  @ApiConsumes('application/json')
  createRoom(@Body() payload: RoomPayloadDTO) {
    return this.roomService.createRoom(payload);
  }

  @Delete(':id')
  deleteRoom(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.deleteRoom(id);
  }

  @Get('search')
  searchRoom(@Query() query: RoomSearchDTO) {
    return this.roomService.searchRoom(query);
  }

  @Put(':id')
  updateRoomById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: RoomPayloadDTO,
  ) {
    return this.roomService.updateRoom(id, body);
  }

  @Get(':id')
  getRoomById(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.findRoom(id);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'FromFile',
    type: FileUploadDTO,
  })
  @ApiQuery({ name: 'id', description: 'Room Id' })
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @Query() id: number) {
    return this.roomService.uploadImage(file, id);
  }
}
