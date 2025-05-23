import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClickHouseModule } from './fundamentals/clickhouse/clickhouse.module';
import { ApplicationModule } from './modules/application/application.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'postgres',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: true,
    }),
    ClickHouseModule.forRoot({
      url: 'http://localhost:8123',
      username: 'default',
      password: '123456',
    }),
    UserModule,
    ApplicationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
