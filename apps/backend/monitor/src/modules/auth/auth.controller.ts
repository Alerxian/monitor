import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/fundamentals/pipes/zod.validation.pipe';

import { AuthService } from './auth.service';
import { LoginDto, LoginSchema } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  @UseGuards(AuthGuard('local'))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
