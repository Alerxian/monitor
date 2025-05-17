import type { MonitorOptions } from '@monitor/core';
import { Monitoring } from '@monitor/core';
import { BrowserTransport } from './transport';
import { ErrorIntegration } from './tracing/errorsIntegration';

export const init = (options: MonitorOptions) => {
  // 初始化monitor
  const monitor = new Monitoring(options);
  // 初始化transport
  const transport = new BrowserTransport(options.dsn);
  monitor.init(transport);

  // 错误采集
  new ErrorIntegration(transport).init();

  // 性能采集
  // new Metrics(transport).init();

  return monitor;
};
