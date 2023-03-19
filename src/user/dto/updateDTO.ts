import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'number' })
  age: number;

  @ApiProperty({ type: 'string' })
  avatar: string;

  @ApiProperty({ type: 'string' })
  phoneNumber: number;

  @ApiProperty({ type: 'string' })
  birthDay: Date;

  @ApiProperty({ type: 'string' })
  gender: string;

  @ApiProperty({ type: 'string' })
  role: string;
}

export interface UserDTO {
  name: string;
  age: number;
  phoneNumber: number;
  id: number;
}

export class CreateUserDTO {
  email: string;
  password: string;
}
export class CreateUserDTO_2 {
  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'number' })
  age: number;

  @ApiProperty({ type: 'number' })
  phoneNumber: number;

  @ApiProperty({ type: 'string' })
  birthDay: Date;

  @ApiProperty({ type: 'string' })
  gender: string;

  @ApiProperty({ type: 'string' })
  role: string;

  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'number' })
  id: number;
}

export class SearchUserDTO {
  @ApiProperty({ type: 'string' })
  pageIndex: number;

  @ApiProperty({ type: 'number' })
  pageSize: number;

  @ApiProperty({ type: 'string' })
  keyword: string;
}

export class FileUploadDTO {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
