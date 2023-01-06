import { IsNumber, IsString, Length } from 'class-validator';
import { GOAL, NICKNAME } from '../consts/type';
import { DEFAULT_GOAL, DEFAULT_NICKNAME } from '../consts/defaultValue';

export class User {
  @IsNumber()
  id: number;

  // 유저 이름
  @IsString()
  @Length(0, 10)
  nickname: NICKNAME = DEFAULT_NICKNAME;

  // 유저 목표
  @IsString()
  @Length(0, 20)
  goal: GOAL = DEFAULT_GOAL;
}
