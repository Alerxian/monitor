import { getBrowserInfo } from '@monitor/browser-utils';
import type { Transport } from '@monitor/core';

export class BrowserTransport implements Transport {
  constructor(private dsn: string) {}
  send(data: Record<string, unknown>) {
    const browserInfo = getBrowserInfo();
    const payload = {
      ...data,
      browserInfo,
    };
    fetch(this.dsn, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((err) => console.error('Failed to send data', err));
  }
}
