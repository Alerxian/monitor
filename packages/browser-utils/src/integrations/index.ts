import { Integration, Transport } from '@monitor/core';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

export class VitalsIntegration extends Integration {
  constructor(transport: Transport) {
    super();
    this.transport = transport;
  }

  init() {
    const vitals = [onCLS, onFCP, onINP, onLCP, onTTFB];
    vitals.forEach((vit) => {
      vit((metric) => {
        this.transport?.send({
          type: 'webVitals',
          event_type: 'performance',
          name: metric.name,
          value: metric.value,
          path: window.location.pathname,
        });
      });
    });
  }
}
