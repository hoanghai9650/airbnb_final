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
} from './dto/updateDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { readFile, unlinkSync } from 'fs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { USER } from 'src/utils/custom_decorator';

@ApiTags('User')
@Controller('/user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  getUser() {
    return this.userService.getUser();
  }

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('application/json')
  updateUser(@Body() payload: CreateUserDTO_2) {
    return this.userService.updateUser(payload);
  }

  @Delete()
  @ApiBearerAuth()
  deleteUser(@Query('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Get('search')
  @ApiBearerAuth()
  searchUser(@Query() query: SearchUserDTO) {
    return this.userService.searchUser(query);
  }

  @Put(':id')
  @ApiBearerAuth()
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDTO,
  ) {
    return this.userService.updateUserById(id, body);
  }

  @Get(':id')
  @ApiBearerAuth()
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUser(id);
  }

  @Get('search/:name')
  @ApiBearerAuth()
  getUserByUserName(@Param('name') name: string) {
    return this.userService.getUserByName(name);
  }

  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, cb) =>
          cb(null, Date.now() + '_' + file.originalname),
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'FromFile',
    type: FileUploadDTO,
  })
  @ApiBearerAuth()
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @USER() user: any) {
    const userId = user?.id;

    readFile(process.cwd() + '/public/img/' + file.filename, (err, data) => {
      const fileName = `"data: ${file.mimetype}; base64, ${Buffer.from(
        data,
      ).toString('base64')}"`;
      unlinkSync(process.cwd() + '/public/img/' + file.filename);
      return this.userService.uploadAvatar(fileName, userId);
    });
  }
}
