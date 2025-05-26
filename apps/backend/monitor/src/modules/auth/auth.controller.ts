import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/fundamentals/pipes/zod.validation.pipe';

import { AuthService } from './auth.service';
import { Roles } from './decorators/role.decorator';
import { LoginDto, LoginSchema, RoleDto, RoleSchema } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  @UseGuards(AuthGuard('local'))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // 添加权限
  @Put(':id/roles')
  @UsePipes(new ZodValidationPipe(RoleSchema))
  @Roles('SUPER_ADMIN')
  async assignRoles(
    @Body() body: { roles: string[] },
    @Param('id') id: string,
  ) {
    return this.authService.assignRoles(+id, body.roles);
  }

  @Delete(':id/roles')
  async removeRoles(@Param('id') id: string, @Body() { roles }: RoleDto) {
    return this.authService.removeRoles(+id, roles);
  }
}
