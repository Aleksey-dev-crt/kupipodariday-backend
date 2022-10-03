import { User } from '../entities/user.entity';

export type CreateUserDto = Omit<User, 'updatedAt'>;
