import { createClient } from '@clickhouse/client';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class ClickHouseModule {
  static forRoot(options: { url: string; username: string; password: string }) {
    return {
      module: ClickHouseModule,
      providers: [
        {
          provide: 'CLICK_HOUSE_CLIENT',
          useFactory: () => {
            return createClient({ ...options });
          },
        },
      ],
      exports: ['CLICK_HOUSE_CLIENT'],
    };
  }
}
