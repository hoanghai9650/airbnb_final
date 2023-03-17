import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signIn')
  @ApiBody({ description: 'Modal', type: LoginDTO })
  login(@Body() body: LoginDTO) {
    const { email, password } = body;
    return this.authService.signIn(email, password);
  }

  @Post('/signup')
  @ApiBody({ description: 'Modal', type: LoginDTO })
  signUp(@Body() createUserDTO: LoginDTO) {
    return this.authService.signUp(createUserDTO);
  }
}
