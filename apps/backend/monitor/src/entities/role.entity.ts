import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { CommonEntity } from './common';
import { PermissionEntity } from './permission.entity';
import { UserEntity } from './user.entity';

@Entity()
export class RoleEntity extends CommonEntity {
  @Column({ unique: true, comment: '角色名称' })
  name: string;

  @Column({ comment: '角色描述' })
  description: string;

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions: PermissionEntity[];

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
