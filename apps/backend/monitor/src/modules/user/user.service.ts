import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { saltOrRounds } from 'src/fundamentals/common/constants';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    createUserDto.password = await bcrypt.hash(password, saltOrRounds);

    const user = await this.userRepository.save(createUserDto);
    return {
      code: 200,
      message: '注册成功',
      data: user,
    };
  }

  findById(id: number, relations: string[] = []) {
    return this.userRepository.findOne({
      where: { id },
      relations,
    });
  }

  findUserAndRoles(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: ['roles', 'roles.permissions'],
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        status: true,
        roles: {
          name: true,
          description: true,
          permissions: { id: true, name: true },
        },
      },
    });
  }

  findByUserName(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async validateUser(username: string, password: string) {
    const user = await this.findByUserName(username);
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    return user;
  }

  update(id: number, updateUserDto) {
    Logger.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
