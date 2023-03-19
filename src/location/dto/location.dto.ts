import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDTO {
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'string' })
  province: string;

  @ApiProperty({ type: 'string' })
  country: string;

  @ApiProperty({ type: 'string' })
  image: string;
}

export class SearchLocationDTO {
  @ApiProperty({ type: 'string' })
  pageIndex: number;

  @ApiProperty({ type: 'number' })
  pageSize: number;

  @ApiProperty({ type: 'string' })
  keyword: string;
}
