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

    const result = this.pipe(
      originUserList,
      (arr: IterableIterator<User>) => this.filter(arr, this.getEvenIdUserList),
      (arr: IterableIterator<User>) => this.userTake(arr, params.length),
    );

    if (Array.isArray(result) !== true) {
      throw Error('최종 전달된 객체가 Array<User>가 아닙니다');
    } else {
      return result as Array<User> | null;
    }
  }

  private pipe(
    iter: IterableIterator<User> | Array<User>,
    ...funcs: Array<
      (...args: any[]) => IterableIterator<User> | Array<User> | null
    >
  ): IterableIterator<User> | Array<User> | null {
    let insertedIter = iter;
    if (Array.isArray(insertedIter) === true) {
      insertedIter = this.makeUserIterable(insertedIter as Array<User>);
    }

    return this.reduce(insertedIter as IterableIterator<User> | null, ...funcs);
  }

  private reduce(
    iter: IterableIterator<User> | null,
    ...funcs: Array<
      (...args: any[]) => IterableIterator<User> | Array<User> | null
    >
  ): IterableIterator<User> | Array<User> | null {
    let tempIter: IterableIterator<User> | null | Array<User> = iter;
    let i = 0;
    for (const func of funcs) {
      const result = func(tempIter);
      if (Array.isArray(result) && i !== funcs.length - 1) {
        if (result !== null) {
          tempIter = this.makeUserIterable(
            result as Array<User>,
          ) as IterableIterator<User>;
          continue;
        }
      }
      tempIter = result as IterableIterator<User> | null | Array<User>;
      i++;
    }
    return tempIter;
  }

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

  private getEvenIdUserList(user: User): boolean {
    return user.id % 2 === 0;
  }

  private userTake(
    userList: IterableIterator<User> | null,
    length = 1,
  ): Array<User> {
    let i = 0;
    const takeUserList: Array<User> = [];

    if (userList === null) {
      return [];
    }

    for (const user of userList) {
      if (i < length) {
        takeUserList.push(user);
        i++;
      } else break;
    }
    return takeUserList;
  }
}
