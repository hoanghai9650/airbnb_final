import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { LoginDTO, UserInfo } from './dto';
import { failCode, successCode } from 'src/utils/response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(userDetail: LoginDTO) {
    const { email, password } = userDetail;
    const checkUser = await this.userRepository.findOneBy({ email: email });

    if (checkUser) {
      failCode({}, 'User existed');
    } else {
      const user = {
        email,
        password: bcrypt.hashSync(password, 10),
        ...userDetail,
      };

      const newUser = this.userRepository.create({
        ...user,
        createdAt: new Date(),
      });

      await this.userRepository.save(newUser);
      successCode(newUser, 'Create Success');
    }
  }

  async signIn(email: string, password: string) {
    const checkUser = await this.userRepository.findOneBy({
      email: email,
    });

    if (checkUser) {
      const checkPass = bcrypt.compareSync(password, checkUser.password);

      if (checkPass) {
        const user = await this.userRepository
          .createQueryBuilder()
          .where({ email: email })
          .select('User.email')
          .addSelect('User.name')
          .addSelect('User.id')
          .getOne();

        const token = this.jwtService.sign(
          { user },
          {
            secret: this.config.get('SECRET_KEY'),
            expiresIn: '24h',
          },
        );
        successCode(token, 'Login successfully');
      } else {
        failCode({ email, password }, 'Wrong password');
      }
    } else {
      failCode({ email, password }, 'Wrong Email');
    }
  }
}
