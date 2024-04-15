import { User } from '@/domains/entities/User';
import { UserRepository } from '@/domains/repositories/UserRepository';
import { UserId } from '@/domains/valueObject/userId';

export class UserRepositoryImpl implements UserRepository {
  constructor(private _users: User[] = []) {}

  async findUniqueById(id: UserId): Promise<User | void> {
    const user = this._users.find((user) => user.id === id);

    if (!user) return;

    return User.reconstruct({
      id: user.id,
      type: user.type,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async create(user: User): Promise<User> {
    this._users.push(user);
    return user;
  }
}
