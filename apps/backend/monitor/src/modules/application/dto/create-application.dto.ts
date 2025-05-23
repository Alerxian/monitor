import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApplicationType } from 'src/entities/application.entity';
import { z } from 'zod';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(ApplicationType)
  appType: string;
}

export const CreateAppSchema = z.object({
  name: z.string().min(1, '名称不能为空'),
  description: z.string().optional(),
  appType: z.nativeEnum(ApplicationType, {
    errorMap: () => ({ message: '应用类型无效' }),
  }),
});
