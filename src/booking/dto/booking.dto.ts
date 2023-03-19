import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDTO {
  @ApiProperty({ type: 'number' })
  roomId: number;

  @ApiProperty({ type: 'number', default: new Date() })
  arrivedDate: Date;

  @ApiProperty({ type: 'number', default: new Date() })
  leaveDate: Date;

  @ApiProperty({ type: 'number' })
  numOfGuests: number;

  @ApiProperty({ type: 'number' })
  userId: number;
}
