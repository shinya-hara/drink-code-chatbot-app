import { User } from '../entities/User';

export interface UserRepository {
  findUniqueById(id: string): Promise<User | void>;
  create(user: User): Promise<User>;
}
