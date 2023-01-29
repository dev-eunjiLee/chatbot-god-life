import {
  CreateUserService,
  USER_CHECK_FOR_CREATE_USER_CODE,
  UserCheckForCreateUserInputDto,
} from '../services/create-user.service';
import { KAKAO_SERVICE_TIME_ZONE } from '../../common/dtos/kakao.skill.dto';

describe('', () => {
  const createUserService = new CreateUserService();

  let params: UserCheckForCreateUserInputDto;

  test('유저 생성 전 유저 타입 체크 - timeZone 걸러내기', () => {
    params = {
      timeZone: 'Asia',
      lang: 'ko',
    };
    const result1 = createUserService['userRequestCheckForCreateUser'](params);
    expect(result1).toStrictEqual(
      USER_CHECK_FOR_CREATE_USER_CODE.NO_SERVICE_TIME_ZONE,
    );
  });

  test('유저 생성 전 유저 타입 체크 - lang 걸러내기', () => {
    params = {
      timeZone: KAKAO_SERVICE_TIME_ZONE,
      lang: 'en',
    };
    const result1 = createUserService['userRequestCheckForCreateUser'](params);
    expect(result1).toStrictEqual(
      USER_CHECK_FOR_CREATE_USER_CODE.NO_SERVICE_TIME_ZONE,
    );
  });
});
