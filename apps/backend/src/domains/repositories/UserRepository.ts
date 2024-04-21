import { type User } from '../entities/User';
import { type UserId } from '../valueObject/UserId';

export interface UserRepository {
  findUniqueById(id: UserId): Promise<User | void>;
  create(user: User): Promise<User>;
}
