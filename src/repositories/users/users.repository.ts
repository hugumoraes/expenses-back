/* ---------- External ---------- */
import { DeepPartial } from 'typeorm';

/* ---------- Common ---------- */
import { PostgresDataSource } from '../../common/databases/postgres.database';

/* ---------- Models ---------- */
import { User } from '../../models/user/user.entity';

const user_repository = PostgresDataSource.getRepository(User);

const get_user_by_id = async (id: number): Promise<User> => {
  const user = await user_repository.findOne({
    where: {
      user_id: id,
    },
  });

  if (!user) throw new Error('User not found');

  return user;
};

const get_user_by_user_login = async (
  user_login: string,
): Promise<User | null> => {
  const user = await user_repository.findOne({
    where: {
      user_login,
    },
    relations: ['role'],
  });

  return user;
};

const create_user = async (user: DeepPartial<User>): Promise<User> => {
  const new_user = await user_repository.save(user);

  return new_user;
};

const users_repository = {
  create_user,
  get_user_by_id,
  get_user_by_user_login,
};

export { users_repository };
