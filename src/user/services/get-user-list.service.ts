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
    const originUserList = await this.getUserListOutboundPort.execute();

    // 지연 평가 구현을 위해 요리조리 제너레이터 사용해보는 중
    const generatorUserList = this.makeUserIterable(originUserList);

    // 아이디가 짝수인 경우
    const evenUserList = this.makeEvenIdUserList(generatorUserList);
    // 최신순으로 일정 개수만큼 가져오기
    return this.take(evenUserList, params.length);
  }

  private *makeUserIterable(userList: Array<User>): IterableIterator<User> {
    let i = 0;
    while (i < userList.length) {
      yield userList[i];
      i++;
    }
  }

  private *makeEvenIdUserList(
    genUserList: IterableIterator<User>,
  ): IterableIterator<User> {
    for (const user of genUserList) {
      if (user.id % 2 === 0) yield user;
    }
  }

  private take(userList: IterableIterator<User>, length = 1): Array<User> {
    let i = 0;
    const takeUserList: Array<User> = [];
    for (const user of userList) {
      if (i < length) {
        takeUserList.push(user);
        i++;
      } else break;
    }
    return takeUserList;
  }
}
