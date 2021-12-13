import { hashSync } from 'bcrypt';

export const hashPassword = {
  to: (password: string) => hashSync(password, 10),
  from: (hash: string) => hash,
};
