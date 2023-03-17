import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { ConfigService } from '@nestjs/config';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private config: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;

    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const tokenDecode: JwtPayload = jwt_decode(token);

      if (tokenDecode.exp < Date.now() / 1000) {
        throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
      } else {
        const decoded: any = jwt.verify(token, this.config.get('SECRET_KEY'));

        const user = await this.userService.findUser(decoded.user.id);

        if (!user) {
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        }

        req.user = user;

        next();
      }
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
