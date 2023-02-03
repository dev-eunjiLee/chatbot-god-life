import { Component, ContextTemplate } from './kakao.skill.detail.types';

export const KAKAO_SERVICE_TIME_ZONE = 'Asia/Seoul';
export const KAKAO_SERVICE_LANG_LIST = ['ko', 'kr'] as const;

export type KakaoSkillInputDto = {
  userRequest: {
    timeZone: string; // 사용자의 시간대 - 한국인 경우 "Asia/Seoul"
    block: {
      // 사용자의 발화에 반응한 블록의 정보
      id: string;
      name: string;
    };
    utterance: string; // 사용자의 발화
    lang: string; // 사용자의 언어 - 한국인 경우 "ko"
    user: {
      id: string; // 사용자 식별 key, 동일한 사용자더라도 봇이 다르면 다른 id 발급
      type: string; // 현재는 "botUserKey"만 제공
      properties: {
        isFriend: boolean; // 사용자가 봇과 연결된 카카오톡 채널을 사용하는 경우 제공되는 식별키
      };
    };
  };
  bot: {
    id: string; // 봇의 식별자
    name: string; // 설정된 봇의 이름
  };
};

export type KakaoSkillOutputDto = {
  version: string;
  template: Component;
  context: ContextTemplate;
  data: any;
};
