import { User } from '../../users/entities/user.entity';

interface IUserProps {
  email?: string;
  name?: string;
  password?: string;
}

export default class TestUtil {
  static createAValidUser(data: IUserProps = {}) {
    const user = new User();
    user.email = data.email ?? 'test@gmail.com';
    user.name = data.name ?? 'test';
    user.password = data.password ?? '123456';
    return user;
  }
}
