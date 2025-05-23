import { z } from 'zod';

// export class CreateUserDto {
//   @IsString()
//   @IsNotEmpty({ message: '用户名不能为空' })
//   username: string;

//   @IsString()
//   @IsNotEmpty({ message: '密码不能为空' })
//   password: string;

//   @IsString()
//   @IsEmail()
//   email: string;

//   @IsString()
//   @IsPhoneNumber('CN', {
//     message: '手机号格式不正确',
//   })
//   phone: string;
// }

export const CreateUserSchema = z.object({
  username: z.string().min(1, '用户名不能为空').max(20, '用户名长度不能超过20'),
  password: z.string().min(1, '密码不能为空').min(6, '密码长度不能少于6'),
  email: z.string().email('邮箱格式不正确').optional(),
  phone: z.string().length(11, '手机号格式不正确').optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
