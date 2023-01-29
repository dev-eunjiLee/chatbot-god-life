import { KakaoSkillInputDto } from '../../common/dtos/kakao.skill.dto';

export type CreateUserInboundPortInputDto = KakaoSkillInputDto;
export type CreateUserInboundPortOutputDto = void;

export interface CreateUserInboundPort {
  execute(
    params: CreateUserInboundPortInputDto,
  ): Promise<CreateUserInboundPortOutputDto>;
}
