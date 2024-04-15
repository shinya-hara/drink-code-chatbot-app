import { User } from '@/domains/entities/User';
import { UserRepository } from '@/domains/repositories/UserRepository';

export class UserRepositoryImpl implements UserRepository {
  constructor(private _users: User[] = []) {}

  async findUniqueById(id: string): Promise<User | void> {
    const user = this._users.find((user) => user.id.value === id);

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
