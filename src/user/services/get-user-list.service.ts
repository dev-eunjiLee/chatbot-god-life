import {
  GetUserListInboundPort,
  GetUserListInboundPortInputDto,
  GetUserListInboundPortOutputDto,
} from '../inbound-port/get-user-list.inbound-port';
import { Inject, Injectable } from '@nestjs/common';
import {
  GET_USER_LIST_OUTBOUND_PORT,
  GetUserListOutboundPort,
} from '../oubound-port/get-user-list.outbound-port';
import { User } from '../entities/user.entity';

@Injectable()
export class GetUserListService implements GetUserListInboundPort {
  constructor(
    @Inject(GET_USER_LIST_OUTBOUND_PORT)
    private readonly getUserListOutboundPort: GetUserListOutboundPort,
  ) {}
  async execute(
    params: GetUserListInboundPortInputDto,
  ): Promise<GetUserListInboundPortOutputDto> {
    // 함수형 프로그래밍 테스트를 위해 DB에서 전체 데이터를 가져온 후 필터링
    const userList = await this.getUserListOutboundPort.execute();

    // 지연 평가 구현을 위해 요리조리 제너레이터 사용해보는 중
    const generatorUserList = this.makeUserIterable(userList);
    const evenUserList = this.makeEvenUserIterable(generatorUserList);
    for (const user of evenUserList) {
      console.log(user);
    }

    console.log(userList);
    console.log(generatorUserList);
    console.log(evenUserList);

    return userList;
  }

  private *makeUserIterable(userList: Array<User>): IterableIterator<User> {
    let i = 0;
    while (i < userList.length) {
      yield userList[i];
      i++;
    }
  }

  private *makeEvenUserIterable(
    genUser: IterableIterator<User>,
  ): IterableIterator<User> {
    let flag = true;
    let i = 0;
    while (flag) {
      const user = genUser.next().value as User;
      if (user === undefined) {
        flag = false;
      } else if (user.id % 2 === 0) {
        yield user;
      }
      i++;
    }
  }
}
