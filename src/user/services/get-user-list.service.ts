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
      (arr: IterableIterator<User>) =>
        this.filter(arr, (user) => user.id % 2 === 0),
      (arr: IterableIterator<User>) =>
        this.filter(arr, (user) => user.id % 3 === 0),
      (arr: IterableIterator<User>) =>
        this.userTake(
          arr,
          Number.isNaN(params.length) || params.length === undefined
            ? null
            : params.length,
        ),
    );

    if (Array.isArray(result) !== true) {
      throw Error('최종 전달된 객체가 Array<User>가 아닙니다');
    } else {
      return result as Array<User> | null;
    }
  }

  // 들어온 함수들이 reduce 함수를 탈 수 있도록 해주는 함수
  private pipe(
    iter: IterableIterator<User> | Array<User>,
    ...funcs: Array<
      (...args: any[]) => IterableIterator<User> | Array<User> | null
    >
  ): IterableIterator<User> | Array<User> | null {
    let insertedIter = iter;
    // 처음에 들어온 객체가 IterableIterator가 아니라 Array인 경우 IterableIterator 객체로 변경
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
      // 배열로 들어온 값이 func 통과할 수 있도록 로직 구현
      const result = func(tempIter);

      // 마지막 함수를 돈 경우가 아닌데, Array<User>가 리턴된거면 IterableIterator로 변경해줌
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

  // 지연평가용 filter
  private *filter(
    iter: IterableIterator<User>,
    func: (...args: any[]) => any,
  ): IterableIterator<User> {
    for (const perIter of iter) {
      if (func(perIter) === true) yield perIter;
    }
  }

  // 지연평가 하기 위해 일반 Array<User>를 IterableIterator<User>로 변경해주는 함수
  private *makeUserIterable(userList: Array<User>): IterableIterator<User> {
    let i = 0;
    while (i < userList.length) {
      yield userList[i];
      i++;
    }
  }

  // IterableIterator 평가 후 최종 리턴 시 사용
  private userTake(
    userList: IterableIterator<User> | null,
    length: number | null,
  ): Array<User> {
    let i = 0;
    const takeUserList: Array<User> = [];

    if (userList === null) {
      return [];
    }

    const arraySize = length === null ? Number.MAX_SAFE_INTEGER : length;

    for (const user of userList) {
      if (i < arraySize) {
        takeUserList.push(user);
        i++;
      } else break;
    }

    return takeUserList;
  }
}
