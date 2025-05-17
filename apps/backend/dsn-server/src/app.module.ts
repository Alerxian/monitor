import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClickHouseModule } from './fundamentals/clickhouse/clickhouse.module';
import { SpanModule } from './modules/span/span.module';

@Module({
  imports: [
    ClickHouseModule.forRoot({
      url: 'http://localhost:8123',
      username: 'default',
      password: '123456',
    }),
    SpanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
