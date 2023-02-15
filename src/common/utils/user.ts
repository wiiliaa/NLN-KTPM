import { User } from 'src/auth/user.entity';

export const isAdmin = (user: User) => {
  if (user.role.name == 'admin') {
    return true;
  }
  return false;
};
