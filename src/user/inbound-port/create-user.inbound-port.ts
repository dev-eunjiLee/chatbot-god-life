import { KakaoSkillInputDto } from '../../common/dtos/kakao.skill.dto';

export const CREATE_USER_INBOUND_PORT = 'CREATE_USER_INBOUND_PORT';

export type CreateUserInboundPortInputDto = KakaoSkillInputDto;
export type CreateUserInboundPortOutputDto = void;

export interface CreateUserInboundPort {
  execute(
    params: CreateUserInboundPortInputDto,
  ): Promise<CreateUserInboundPortOutputDto>;
}
