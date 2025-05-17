/**
 * 自定义事件
 *
 */

import { getTransport } from './baseClient';

/** 自定义异常 */
export function captureException(exception: Error) {
  getTransport()?.send({
    type: 'customEvent',
    event_type: 'custom',
    exception,
  });
}
/** 自定义消息 */
export function captureMessage(message: string) {
  getTransport()?.send({
    type: 'customEvent',
    event_type: 'custom',
    message,
  });
}

interface EventData<T> {
  eventType: string;
  data: T;
}

export function captureEvent<T>(eventData: EventData<T>) {
  getTransport()?.send({
    type: 'customEvent',
    event_type: 'custom',
    eventData,
  });
}
