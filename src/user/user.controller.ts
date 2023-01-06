import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInputDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
  @Post('/create')
  createUser(@Body() createUserInputDto: CreateUserInputDto) {
    console.log(createUserInputDto);
  }
}
