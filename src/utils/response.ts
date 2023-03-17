import { HttpException, HttpStatus } from '@nestjs/common';

export const successCode = (data: any, message: string) => {
  throw new HttpException({ message, content: data }, HttpStatus.OK);
};

export const failCode = (data: any, message: string) => {
  throw new HttpException({ message, content: data }, HttpStatus.BAD_REQUEST);
};

export const notFoundCode = (message: string) => {
  throw new HttpException({ message }, HttpStatus.NOT_FOUND);
};

export const expiredToken = (data: any, message: string) => {
  throw new HttpException({ message, content: data }, HttpStatus.UNAUTHORIZED);
};

export const errorCode = (data: any, message: string) => {
  throw new HttpException(
    { message, content: data },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
