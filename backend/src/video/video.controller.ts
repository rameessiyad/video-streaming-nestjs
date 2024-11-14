import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Video } from 'src/model/video.schema';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  async createBook(
    @Res() response,
    @Req() request,
    @Body() video: Video,
    @UploadedFiles()
    files: { video?: Express.Multer.File[]; cover?: Express.Multer.File[] },
  ) {
    const requestBody = {
      createdBy: request.user,
      title: video.title,
      video: files.video[0].filename,
      coverImage: files.cover[0].filename,
    };
    const newVideo = await this.videoService.createVideo(requestBody);
    return response.status(HttpStatus.CREATED).json({ newVideo });
  }
}
