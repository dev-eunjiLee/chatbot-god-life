import { Controller, Post, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { KakaoSkillInputDto } from './common/dtos/kakao.skill.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test')
  test(@Body() body: KakaoSkillInputDto): any {
    console.log(body);
    return {
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: body.userRequest.utterance,
          },
        ],
      },
    };
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
