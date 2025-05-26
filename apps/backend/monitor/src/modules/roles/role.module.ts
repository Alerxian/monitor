import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permission.entity';
import { RoleEntity } from 'src/entities/role.entity';

import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity, RoleEntity])],
  providers: [RoleService],
  exports: [RoleService],
  controllers: [],
})
export class RoleModule {}
