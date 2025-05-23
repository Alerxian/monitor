import { Body, Controller, Get, Post } from '@nestjs/common';

import { SpanService } from './span.service';

@Controller()
export class SpanController {
  constructor(private readonly spanService: SpanService) {}

  @Post('tracing')
  tracing(@Body() data) {
    return this.spanService.tracing(data);
  }

  @Get('span')
  span() {
    return this.spanService.span();
  }
}
