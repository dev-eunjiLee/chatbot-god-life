import { Injectable } from '@nestjs/common';
import { CreateUserInputDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import { userList } from './table/user';

@Injectable()
export class UserService {
  createUser(createUserInputDto: CreateUserInputDto) {
    const user: User = {
      ...createUserInputDto,
      id: userList.length,
    };
    userList.push(user);
  }
}
