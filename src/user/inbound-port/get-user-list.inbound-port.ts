import { GOAL, NICKNAME } from '../entities/user.entity';

export const GET_USER_LIST_INBOUND_PORT = 'GET_USER_LIST_INBOUND_PORT';

export type GetUserListInboundPortInputDto = void;
export type GetUserListInboundPortOutputDto = Array<{
  id: number;
  nickname: NICKNAME;
  goal: GOAL;
}>;

export interface GetUserListInboundPort {
  execute(
    params: GetUserListInboundPortInputDto,
  ): Promise<GetUserListInboundPortOutputDto>;
}
