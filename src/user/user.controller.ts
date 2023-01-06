import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInputDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  createUser(@Body() createUserInputDto: CreateUserInputDto) {
    this.userService.createUser(createUserInputDto);
  }
}
