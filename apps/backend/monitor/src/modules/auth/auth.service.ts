import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { UserEntity } from 'src/entities/user.entity';
import { In, Repository } from 'typeorm';

import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(loginDto: LoginDto) {
    const existingUser = await this.userService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!existingUser) {
      return {
        code: 200,
        message: '用户名或密码不正确',
        data: null,
      };
    }
    const user = await this.userRepository.findOne({
      where: { id: existingUser.id },
      relations: ['roles', 'roles.permissions'],
    });
    if (!user) {
      return;
    }
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles?.map((role) => role.name),
      permissions: user.roles?.flatMap((role) =>
        role.permissions.map((p) => p.name),
      ),
    };
    Logger.log(payload, 'Login payload');

    return {
      access_token: this.jwtService.sign(payload),
      code: 200,
      message: '登录成功',
    };
  }

  async assignRoles(userId: number, roleNames: string[]) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['roles'],
      });
      if (!user) {
        return {
          code: 404,
          message: '用户不存在',
          data: null,
        };
      }
      Logger.log(user, 'user');
      const roles = await this.roleRepository.find({
        where: {
          name: In(roleNames),
        },
      });
      user.roles = roles;
      await this.userRepository.save(user);

      return {
        code: 200,
        message: '角色分配成功',
        data: null,
      };
    } catch (error) {
      Logger.error(error);
      return {
        code: 500,
        message: '角色分配失败',
        data: null,
      };
    }
  }

  async removeRoles(userId: number, roleNames: string[]) {
    const user = await this.userService.findById(userId, roleNames);
    if (!user) {
      return {
        code: 404,
        message: '用户不存在',
        data: null,
      };
    }

    user.roles = user.roles.filter((role) => !roleNames.includes(role.name));
    await this.userRepository.save(user);

    return {
      code: 200,
      message: '角色分配成功',
      data: null,
    };
  }
}
