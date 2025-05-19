import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './common';
import { UserEntity } from './user.entity';

export enum ApplicationType {
  React = 'react',
  Vue = 'vue',
  Vanilla = 'vanilla',
}

@Entity('application')
export class ApplicationEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 20,
    comment: '应用名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '应用标识',
  })
  appId: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    comment: '应用描述',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: ApplicationType,
    default: ApplicationType.React,
    comment: '应用类型',
  })
  appType: string;

  @ManyToOne(() => UserEntity, (user) => user.applications)
  user: UserEntity;
}
