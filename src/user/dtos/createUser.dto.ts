import { IsString } from 'class-validator';
import { DEFAULT_GOAL, DEFAULT_NICKNAME } from '../consts/defaultValue';
import { GOAL, NICKNAME } from '../consts/type';

export class CreateUserInputDto {
  // 유저 이름
  @IsString()
  nickname: NICKNAME = DEFAULT_NICKNAME;

  // 유저 목표
  @IsString()
  goal: GOAL = DEFAULT_GOAL;
}
