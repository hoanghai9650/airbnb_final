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
import { ApiBearerAuth, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDTO } from './dto/booking.dto';

@Controller('booking')
@ApiTags('Booking')
@ApiBearerAuth()
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get()
  getBooking() {
    return this.bookingService.getBooking();
  }

  @Post()
  @ApiConsumes('application/json')
  createBooking(@Body() payload: CreateBookingDTO) {
    return this.bookingService.createBooking(payload);
  }

  @Get(':id')
  getBookingById(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.findBooking(id);
  }

  @Put(':id')
  updateBooking(
    @Body() payload: CreateBookingDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookingService.updateBooking(id, payload);
  }

  @Delete(':id')
  deleteBooking(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.deleteBooking(id);
  }

  @Get('/by-user/:id')
  getBookingByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.getBookingByUserId(id);
  }
}
