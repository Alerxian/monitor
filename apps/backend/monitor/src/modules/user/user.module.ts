import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from 'src/entities/application.entity';
import { UserEntity } from 'src/entities/user.entity';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ApplicationEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
