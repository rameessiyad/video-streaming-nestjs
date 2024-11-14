import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/video-stream'),
    UserModule,
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
