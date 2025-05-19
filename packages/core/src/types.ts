import type { Transport } from './transport';

export interface IIntegration {
  init(transport: Transport): void;
}

export class Integration implements IIntegration {
  transport: Transport | null = null;
  init() {
    throw new Error('Method not implemented.');
  }
}

export interface MonitorOptions {
  /**
   * 上报地址
   */
  dsn: string;
  /**
   * 插件集成
   */
  integration?: IIntegration[];
}
