import { User } from '../user/entities/user.entity';

export const TempUserDatabase = (() => {
  const userList: User[] = [
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
    {
      id: 3,
      nickname: 'user3',
      goal: '매일매일 운동하기',
    },
  ];

  return {
    getUserList: () => Promise.resolve(userList),
  };
})();
