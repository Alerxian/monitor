import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApplicationType } from 'src/entities/application.entity';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  // @IsString()
  // @IsNotEmpty()
  // appId: string;

  @IsEnum(ApplicationType)
  appType: string;
}
