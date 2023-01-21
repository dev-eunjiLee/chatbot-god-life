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

    const generatorUserList = this.makeUserIterable(originUserList);

    const filteredUserList = this.filter(generatorUserList, (per) => {
      if (per.id % 2 === 0) return true;
      else return false;
    });

    // 최신순으로 일정 개수만큼 가져오기
    return this.userTake(filteredUserList, params.length);
  }

  // TODO pipe 다시 만들기

  // TODO reduce 다시 만들기

  private *filter(
    iter: IterableIterator<User>,
    func: (...args: any[]) => any,
  ): IterableIterator<User> {
    for (const perIter of iter) {
      if (func(perIter) === true) yield perIter;
    }
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

  private userTake(userList: IterableIterator<User>, length = 1): Array<User> {
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
