import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';

@Module({
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule {}
