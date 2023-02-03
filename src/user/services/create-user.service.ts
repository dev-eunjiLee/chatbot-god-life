import { Injectable } from '@nestjs/common';
import {
  CreateUserInboundPort,
  CreateUserInboundPortInputDto,
  CreateUserInboundPortOutputDto,
} from '../inbound-port/create-user.inbound-port';
import {
  KAKAO_SERVICE_LANG_LIST,
  KAKAO_SERVICE_TIME_ZONE,
} from '../../common/dtos/kakao.skill.dto';

export enum USER_CHECK_FOR_CREATE_USER_CODE {
  OK = 'OK',
  NO_SERVICE_TIME_ZONE = 'NO_SERVICE_TIME_ZONE',
  NO_SERVICE_LANG = 'NO_SERVICE_LANG',
}

export type UserCheckForCreateUserInputDto = {
  timeZone: string;
  lang: string;
};

type UserCheckForCreateUserOutputDto = USER_CHECK_FOR_CREATE_USER_CODE;

@Injectable()
export class CreateUserService implements CreateUserInboundPort {
  execute(
    params: CreateUserInboundPortInputDto,
  ): Promise<CreateUserInboundPortOutputDto> {
    console.log(params);

    const kakaoUserCheckResult = this.userRequestCheckForCreateUser({
      timeZone: params.userRequest.timeZone,
      lang: params.userRequest.lang,
    });

    if (kakaoUserCheckResult !== USER_CHECK_FOR_CREATE_USER_CODE.OK) {
      throw Error(kakaoUserCheckResult);
    }

    return Promise.resolve(undefined);
  }

  private userRequestCheckForCreateUser(
    params: UserCheckForCreateUserInputDto,
  ): UserCheckForCreateUserOutputDto {
    const { timeZone, lang } = params;

    if (timeZone !== KAKAO_SERVICE_TIME_ZONE) {
      return USER_CHECK_FOR_CREATE_USER_CODE.NO_SERVICE_TIME_ZONE;
    }

    if (!(KAKAO_SERVICE_LANG_LIST as ReadonlyArray<string>).includes(lang)) {
      return USER_CHECK_FOR_CREATE_USER_CODE.NO_SERVICE_LANG;
    }

    return USER_CHECK_FOR_CREATE_USER_CODE.OK;
  }
}
