import { IsString } from 'class-validator';

export class CreateUserInputDto {
  // 유저 이름
  @IsString()
  nickname: string;

  // 유저 목표
  @IsString()
  goal: string;
}
