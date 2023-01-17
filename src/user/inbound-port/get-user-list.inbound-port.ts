import { GOAL, NICKNAME } from '../entities/user.entity';

export const GET_USER_LIST_INBOUND_PORT = 'GET_USER_LIST_INBOUND_PORT';

export enum GET_USER_LIST_OPTION {
  ALL = 'ALL',
  LATEST = 'LATEST',
  OLDEST = 'OLDEST',
}

export type GetUserListInboundPortInputDto = {
  option: GET_USER_LIST_OPTION;
};
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
