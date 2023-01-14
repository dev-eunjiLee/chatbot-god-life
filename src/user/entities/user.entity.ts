import { IsNumber, IsString, Length } from 'class-validator';

export const DEFAULT_NICKNAME = 'anonymous';
export const DEFAULT_GOAL = '미라클 모닝';

export type NICKNAME = string;
export type GOAL = string;

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
