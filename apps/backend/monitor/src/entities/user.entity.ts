import { Column, Entity, OneToMany } from 'typeorm';

import { ApplicationEntity } from './application.entity';
import { BaseEntity } from './common';

enum UserStatus {
  Active = 1,
  Inactive = 0,
}
@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 20,
    comment: '用户名',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '密码',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '邮箱',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 11,
    nullable: true,
    comment: '手机号',
  })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Active,
    comment: '用户状态',
  }) // 1: Active, 0: Inactive
  status: UserStatus;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '角色',
  })
  role: string;

  @OneToMany(() => ApplicationEntity, (app) => app.user)
  applications: ApplicationEntity[];
}
