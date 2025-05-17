import type { Transport } from './transport';
import type { MonitorOptions } from './types';

export let getTransport: () => Transport | null = () => null;

export class Monitoring {
  transport: Transport | null = null;

  constructor(private options: MonitorOptions) {}

  init(transport: Transport) {
    this.transport = transport;
    getTransport = () => transport;
    const integrations = this.options.integration || [];

    for (const integration of integrations) {
      integration.init(transport);
    }
  }
}
