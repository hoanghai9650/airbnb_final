import { ApiProperty } from '@nestjs/swagger';
export class CommentDTO {
  @ApiProperty({ type: 'number' })
  roomId: number;

  @ApiProperty({ type: 'number' })
  userId: number;

  @ApiProperty({ type: 'string' })
  content: string;

  @ApiProperty({ type: 'number', default: new Date() })
  createdAt: Date;

  @ApiProperty({ type: 'number' })
  rate: number;
}
