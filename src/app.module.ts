import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FunctionalProgrammingTestUserModule } from './functional-programming-test-user/functionalProgrammingTestUserModule';

@Module({
  imports: [FunctionalProgrammingTestUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
