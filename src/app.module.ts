import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MysqlModule } from './lib/mysql/mysql.module';
import * as Joi from 'joi';

@Module({
  imports: [
    // 환경설정
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    // DB 설정
    MysqlModule.forRootAsync(),
    // 서비스 설정
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
