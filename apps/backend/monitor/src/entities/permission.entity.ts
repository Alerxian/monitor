import { Column, Entity, ManyToMany } from 'typeorm';

import { CommonEntity } from './common';
import { RoleEntity } from './role.entity';

@Entity('permission')
export class PermissionEntity extends CommonEntity {
  @Column({ unique: true, comment: '权限名称' })
  name: string;

  @Column({ comment: '权限描述' })
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];
}
