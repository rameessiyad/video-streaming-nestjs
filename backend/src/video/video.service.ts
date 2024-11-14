import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from 'src/model/video.schema';
import { Request, Response } from 'express';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private VideoModel: Model<VideoDocument>,
  ) {}

  async createVideo(video: object): Promise<Video> {
    const newVideo = new this.VideoModel(video);
    return newVideo.save();
  }

  async readVideo(id): Promise<any> {
    if (id.id) {
      return this.VideoModel.findOne({ _id: id.id })
        .populate('cratedBy')
        .exec();
    }
    return this.VideoModel.find().populate('cratedBy').exec();
  }

  async streamVideo(id: string, response: Response, request: Request) {
    try {
      const data = await this.VideoModel.findOne({ _id: id });
      if (!data) {
        throw new NotFoundException(null, 'videoNotFound');
      }
      const { range } = request.headers;
      if (range) {
        const { video } = data;
        const videoPath = statSync(join(process.cwd(), `./public/${video}`));
        const CHUNK_SIZE = 1 * 1e6;
        const start = Number(range.replace(/\D/g, ''));
        const end = Math.min(start * CHUNK_SIZE, videoPath.size - 1);
        const videoLength = end - start + 1;
        response.status(206);
        response.header({
          'Content-Range': `bytes ${start}-${end}/${videoPath.size}`,
          'Accept-Ranges': 'bytes',
          'Content-length': videoLength,
          'Content-Type': 'video/mp4',
        });
        const vidoeStream = createReadStream(
          join(process.cwd(), `./public/${video}`),
          { start, end },
        );
        vidoeStream.pipe(response);
      } else {
        throw new NotFoundException(null, 'range not found');
      }
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException();
    }
  }
}
