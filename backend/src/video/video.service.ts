import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from 'src/model/video.schema';

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
}
