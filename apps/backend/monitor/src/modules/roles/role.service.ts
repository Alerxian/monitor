import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permission.entity';
import { RoleEntity } from 'src/entities/role.entity';
import { In, Repository } from 'typeorm';

import {
  CONTENT_PERMISSIONS,
  ORDER_PERMISSIONS,
  PAYMENT_PERMISSIONS,
  PREDEFINED_ROLES,
  ROLE_PERMISSIONS,
  USER_PERMISSIONS,
} from './constants';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async onModuleInit() {
    await this.initPermissions();
    await this.initRoles();
  }

  private async initPermissions() {
    const allPermissions = [
      ...USER_PERMISSIONS,
      ...ROLE_PERMISSIONS,
      ...ORDER_PERMISSIONS,
      ...PAYMENT_PERMISSIONS,
      ...CONTENT_PERMISSIONS,
    ];

    for (const permission of allPermissions) {
      const existing = await this.permissionRepository.findOne({
        where: { name: permission.name },
      });
      if (!existing) {
        await this.permissionRepository.save(permission);
      }
    }
  }

  private async initRoles() {
    for (const role of PREDEFINED_ROLES) {
      const existingRole = await this.roleRepository.findOne({
        where: { name: role.name },
      });

      if (!existingRole) {
        const expandedPermissions = await this.expandPermissions(
          role.permissions,
        );

        // 查找所有实体
        const permissions = await this.permissionRepository.findBy({
          name: In(expandedPermissions),
        });

        await this.roleRepository.save({
          name: role.name,
          description: role.description,
          permissions: permissions,
        });
      }
    }
  }

  private async expandPermissions(permissions: string[]) {
    const allPermissions = await this.permissionRepository.find();
    const expand = new Set<string>();
    for (const perm of permissions) {
      if (perm.endsWith(':*')) {
        const prefix = perm.slice(0, -2);
        allPermissions
          .filter((p) => p.name.startsWith(prefix))
          .forEach((p) => expand.add(p.name));
      } else {
        expand.add(perm);
      }
    }

    return Array.from(expand);
  }
}
