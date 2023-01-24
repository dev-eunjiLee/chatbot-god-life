import { Controller, Post, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test')
  test(@Body() body: any): { version: string; data: { msg: string } } {
    console.log(body);
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
