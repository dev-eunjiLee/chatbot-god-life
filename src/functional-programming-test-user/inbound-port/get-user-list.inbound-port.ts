import { GOAL, NICKNAME } from '../entities/user.entity';

export const GET_USER_LIST_INBOUND_PORT = 'GET_USER_LIST_INBOUND_PORT';

export enum GET_USER_LIST_OPTION {
  ALL = 'ALL',
  EVEN = 'EVEN',
}

export type GetUserListInboundPortInputDto = {
  option: GET_USER_LIST_OPTION;
  length?: number | undefined;
};
export type GetUserListInboundPortOutputDto = Array<{
  id: number;
  nickname: NICKNAME;
  goal: GOAL;
}> | null;

export interface GetUserListInboundPort {
  execute(
    params: GetUserListInboundPortInputDto,
  ): Promise<GetUserListInboundPortOutputDto>;
}
