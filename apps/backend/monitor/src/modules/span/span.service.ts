import { ClickHouseClient } from '@clickhouse/client';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SpanService {
  constructor(
    @Inject('CLICK_HOUSE_CLIENT')
    private readonly clickhouseClient: ClickHouseClient,
  ) {}

  async tracing(data) {
    const values = {
      app_id: '1',
      event_type: data.event_type,
      message: data.message,
      info: data,
    };

    this.clickhouseClient.insert({
      table: 'base_monitor_storage',
      columns: ['app_id', 'event_type', 'message', 'info'],
      values,
      format: 'JSONEachRow',
    });

    return {
      message: 'success',
      code: 200,
    };
  }

  async span() {
    // 查询
    const res = await this.clickhouseClient.query({
      query: 'SELECT * FROM base_monitor_storage',
      format: 'JSON',
    });

    const json = await res.json();
    return {
      message: 'success',
      code: 200,
      data: json.data,
    };
  }
}
