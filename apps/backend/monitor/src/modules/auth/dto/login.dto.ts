import { z } from 'zod';

export class LoginDto {
  username: string;
  password: string;
}

export const LoginSchema = z.object({
  username: z.string().min(1, '用户名不能为空'),
  password: z
    .string()
    .min(6, '密码长度不能少于6位')
    .max(20, '密码长度不能超过20位'),
});
