import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot() {
    return this.appService.getHealth();
  }

  @Get('up')
  getUp() {
    return { status: 'ok' };
  }

  @Get('api/v1/health')
  getHealth() {
    return {
      success: true,
      data: {
        status: 'ok',
        message: 'Food24h API is running',
        service: 'Food24h API',
        timestamp: new Date().toISOString(),
      },
      message: 'Food24h API is running',
    };
  }
}
