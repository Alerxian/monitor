import type { Transport } from '@monitor/core';
import { Integration } from '@monitor/core';

export class ErrorIntegration extends Integration {
  constructor(transport: Transport | null) {
    super();
    this.transport = transport;
  }

  init() {
    window.onerror = (msg, url, line, column, error) => {
      this.transport?.send({
        event_type: 'error',
        type: error?.name,
        stack: error?.stack,
        message: msg,
        url,
        line,
        path: window.location.pathname,
      });
    };

    window.onunhandledrejection = (event) => {
      this.transport?.send({
        event_type: 'error',
        type: 'unhandledrejection',
        stack: event.reason?.stack,
        message: event.reason?.message,
        path: window.location.pathname,
      });
    };
  }
}
