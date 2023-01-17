import { GetUserListService } from '../services/get-user-list.service';
import {
  GetUserListOutboundPort,
  GetUserListOutboundPortOutputDto,
} from '../oubound-port/get-user-list.outbound-port';
import {
  GET_USER_LIST_OPTION,
  GetUserListInboundPortInputDto,
} from '../inbound-port/get-user-list.inbound-port';
import { User } from '../entities/user.entity';

class MGetUserListOutboundAdapter implements GetUserListOutboundPort {
  constructor(private readonly result: GetUserListOutboundPortOutputDto) {}

  async execute(
    params: GetUserListInboundPortInputDto,
  ): Promise<GetUserListOutboundPortOutputDto> {
    return this.result;
  }
}

describe('', () => {
  test('유저 목록 전체 가져오기', async () => {
    const getUserList = await new GetUserListService(
      new MGetUserListOutboundAdapter([
        {
          id: 1,
          nickname: 'user1',
          goal: '미라클모닝',
        },
        {
          id: 2,
          nickname: 'user2',
          goal: '1일1커밋',
        },
      ] as User[]),
    ).execute({ option: GET_USER_LIST_OPTION.ALL });
    console.log(getUserList);

    expect(getUserList).toStrictEqual([
      {
        id: 1,
        nickname: 'user1',
        goal: '미라클모닝',
      },
      {
        id: 2,
        nickname: 'user2',
        goal: '1일1커밋',
      },
    ]);
  });
});
