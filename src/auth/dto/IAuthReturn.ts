import { User } from 'src/users/entities/user.entity';

export interface IAuthReturn {
  user: User;
  token: string;
}
