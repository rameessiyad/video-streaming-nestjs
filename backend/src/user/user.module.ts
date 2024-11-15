import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/model/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { secret } from 'src/utils/constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
