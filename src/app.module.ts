import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entity/User';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './middleWare/auth.middlewaret';
import { Room } from './entity/Room';
import { RoomModule } from './room/room.module';
import { Location } from './entity/Location';
import { LocationModule } from './location/location.module';
import { Booking } from './entity/Booking';
import { BookingModule } from './booking/booking.module';
import { Comment } from './entity/Comment';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'airbnb_database',
      entities: [User, Room, Location, Booking, Comment],
      synchronize: true,
      migrations: ['dist/migrations/*.js'],
    }),
    AuthModule,
    UserModule,
    RoomModule,
    LocationModule,
    BookingModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/signIn', method: RequestMethod.ALL },
        { path: 'auth/signUp', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
