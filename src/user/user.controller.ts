import {
  Body,
  ClassSerializerInterceptor,
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
  Request,
} from '@nestjs/common';

import { UserService } from './user.service';
import {
  CreateUserDTO_2,
  FileUploadDTO,
  SearchUserDTO,
  UpdateUserDTO,
  UserDTO,
} from './dto/updateDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { USER } from 'src/utils/custom_decorator';
import { storage } from 'src/utils/imageUtils';

@ApiTags('User')
@Controller('/user')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Post()
  @ApiConsumes('application/json')
  updateUser(@Body() payload: CreateUserDTO_2) {
    return this.userService.updateUser(payload);
  }

  @Delete()
  deleteUser(@Query('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Get('search')
  searchUser(@Query() query: SearchUserDTO) {
    return this.userService.searchUser(query);
  }

  @Put(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDTO,
  ) {
    return this.userService.updateUserById(id, body);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUser(id);
  }

  @Get('search/:name')
  getUserByUserName(@Param('name') name: string) {
    return this.userService.getUserByName(name);
  }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'FromFile',
    type: FileUploadDTO,
  })
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @USER() user: UserDTO,
  ) {
    const userId = user.id;

    return this.userService.uploadAvatar(file, userId);
  }
}
