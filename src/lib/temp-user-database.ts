import { User } from '../functional-programming-test-user/entities/user.entity';

export const TempUserDatabase = (() => {
  const userList: Array<User> = new Array(100).fill(null).map((per, index) => {
    return {
      id: index,
      nickname: `${index}_nickname`,
      goal: `${index}_goal`,
    };
  });

  return {
    getUserList: () => Promise.resolve(userList),
  };
})();
