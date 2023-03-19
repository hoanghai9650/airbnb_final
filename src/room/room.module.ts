import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/entity/Room';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
