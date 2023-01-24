import { Controller, Post, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test')
  test(): { version: string; data: { msg: string } } {
    return {
      version: '2.0',
      data: {
        msg: 'test',
      },
    };
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
