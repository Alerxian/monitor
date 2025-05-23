import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CommonEntity {
  @PrimaryGeneratedColumn({
    comment: '主键 id',
  })
  id: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    comment: '更新时间',
  })
  updatedAt: Date;
}
