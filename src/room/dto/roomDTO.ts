import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../../entity/Location';

export class RoomPayloadDTO {
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'number' })
  guest: number;

  @ApiProperty({ type: 'number' })
  bedroom: number;

  @ApiProperty({ type: 'number' })
  bed: number;

  @ApiProperty({ type: 'number' })
  bathroom: number;

  @ApiProperty({ type: 'string' })
  description: string;

  @ApiProperty({ type: 'number' })
  price: number;

  @ApiProperty({ type: 'boolean' })
  washer: boolean;

  @ApiProperty({ type: 'boolean' })
  ironing: boolean;

  @ApiProperty({ type: 'boolean' })
  television: boolean;

  @ApiProperty({ type: 'boolean' })
  conditioner: boolean;

  @ApiProperty({ type: 'boolean' })
  wifi: boolean;

  @ApiProperty({ type: 'boolean' })
  kitchen: boolean;

  @ApiProperty({ type: 'boolean' })
  parking: boolean;

  @ApiProperty({ type: 'boolean' })
  pool: boolean;

  @ApiProperty({ type: 'number' })
  locationId: Location;

  @ApiProperty({ type: 'string' })
  image: string;
}

export class RoomSearchDTO {
  @ApiProperty({ type: 'string' })
  pageIndex: number;

  @ApiProperty({ type: 'number' })
  pageSize: number;

  @ApiProperty({ type: 'string' })
  keyword: string;
}
