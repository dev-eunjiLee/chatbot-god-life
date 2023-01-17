import { GOAL, NICKNAME } from '../entities/user.entity';
import { GET_USER_LIST_OPTION } from '../inbound-port/get-user-list.inbound-port';

export const GET_USER_LIST_OUTBOUND_PORT = 'GET_USER_LIST_OUTBOUND_PORT';

export type GetUserListOutboundPortInputDto = void;
export type GetUserListOutboundPortOutputDto = Array<{
  id: number;
  nickname: NICKNAME;
  goal: GOAL;
}>;

export interface GetUserListOutboundPort {
  execute(
    params: GetUserListOutboundPortInputDto,
  ): Promise<GetUserListOutboundPortOutputDto>;
}
