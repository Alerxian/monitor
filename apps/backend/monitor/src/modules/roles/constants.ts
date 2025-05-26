// 用户相关权限
export const USER_PERMISSIONS = [
  { name: 'user:read', description: '查看用户信息' },
  { name: 'user:create', description: '创建用户' },
  { name: 'user:update', description: '更新用户信息' },
  { name: 'user:delete', description: '删除用户' },
  { name: 'user:role:assign', description: '分配用户角色' },
];

// 角色相关权限
export const ROLE_PERMISSIONS = [
  { name: 'role:read', description: '查看角色信息' },
  { name: 'role:create', description: '创建角色' },
  { name: 'role:update', description: '更新角色' },
  { name: 'role:delete', description: '删除角色' },
  { name: 'role:permission:assign', description: '为角色分配权限' },
];

// 订单相关权限
export const ORDER_PERMISSIONS = [
  { name: 'order:read', description: '查看订单' },
  { name: 'order:create', description: '创建订单' },
  { name: 'order:cancel', description: '取消订单' },
  { name: 'order:refund', description: '处理退款' },
];

// 支付相关权限
export const PAYMENT_PERMISSIONS = [
  { name: 'payment:process', description: '处理支付' },
  { name: 'payment:refund', description: '处理退款' },
  { name: 'payment:history', description: '查看支付历史' },
];

// 内容相关权限
export const CONTENT_PERMISSIONS = [
  { name: 'content:read', description: '查看内容' },
  { name: 'content:create', description: '创建内容' },
  { name: 'content:update', description: '更新内容' },
  { name: 'content:delete', description: '删除内容' },
  { name: 'content:publish', description: '发布内容' },
];
// 预定义角色
export const PREDEFINED_ROLES = [
  {
    name: 'SUPER_ADMIN',
    description: '超级管理员',
    permissions: ['user:*', 'role:*', 'content:*', 'order:*', 'payment:*'],
  },
  {
    name: 'ADMIN',
    description: '管理员',
    permissions: [
      'user:read',
      'user:create',
      'user:update',
      'role:read',
      'content:*',
      'order:read',
      'payment:history',
    ],
  },
  {
    name: 'CONTENT_MANAGER',
    description: '内容管理员',
    permissions: [
      'content:read',
      'content:create',
      'content:update',
      'content:publish',
    ],
  },
  {
    name: 'CUSTOMER_SUPPORT',
    description: '客服',
    permissions: ['user:read', 'order:read', 'order:cancel', 'payment:refund'],
  },
  {
    name: 'USER',
    description: '普通用户',
    permissions: ['content:read', 'order:create', 'order:cancel'],
  },
];
