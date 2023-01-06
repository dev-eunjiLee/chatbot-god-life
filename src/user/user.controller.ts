import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInputDto } from './dtos/createUser.dto';
import { userList } from './table/user';

@Controller('user')
export class UserController {
  @Post('/create')
  createUser(@Body() createUserInputDto: CreateUserInputDto) {
    console.log(createUserInputDto);
    userList.push(createUserInputDto);
    console.log(userList);
  }
}
