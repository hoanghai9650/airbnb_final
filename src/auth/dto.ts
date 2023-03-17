import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'string' })
  password: string;
}

export interface UserInfo {
  email: string;
  name: string;
  age: number;
  role: string;
  birthDay: Date;
  gender: string;
}
