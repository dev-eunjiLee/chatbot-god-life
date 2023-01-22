import { User } from '../entities/user.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreateUserInputDto extends PickType(User, ['nickname', 'goal']) {}
