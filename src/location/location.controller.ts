import { CreateLocationDTO, SearchLocationDTO } from './dto/location.dto';
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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LocationService } from './location.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/imageUtils';
import { FileUploadDTO } from 'src/user/dto/updateDTO';

@Controller('location')
@ApiTags('Location')
@ApiBearerAuth()
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  getLocation() {
    return this.locationService.getLocation();
  }

  @Post()
  @ApiConsumes('application/json')
  createLocation(@Body() payload: CreateLocationDTO) {
    return this.locationService.createLocation(payload);
  }

  @Get('search')
  locationSearch(@Query() query: SearchLocationDTO) {
    return this.locationService.searchLocation(query);
  }

  @Get(':id')
  getLocationById(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.findLocation(id);
  }

  @Put(':id')
  updateLocationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateLocationDTO,
  ) {
    return this.locationService.updateLocation(id, body);
  }

  @Delete(':id')
  deleteLocation(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.deleteLocation(id);
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
    return this.locationService.uploadImage(file, id);
  }
}
