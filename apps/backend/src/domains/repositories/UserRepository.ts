import { User } from '../entities/User';
import { UserId } from '../valueObject/UserId';

export interface UserRepository {
  findUniqueById(id: UserId): Promise<User | void>;
  create(user: User): Promise<User>;
}
