import { User } from '@/domains/entities/User';
import { UserRepository } from '@/domains/repositories/UserRepository';
import { PrismaClient } from '@prisma/client';

export class UserRepositoryImpl implements UserRepository {
  constructor(private _prisma: PrismaClient) {}

  async findUniqueById(id: string): Promise<User | void> {
    const _user = await this._prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!_user) return;

    return User.reconstruct({
      id: _user.id,
      type: _user.type,
      createdAt: _user.createdAt,
      updatedAt: _user.updatedAt,
    });
  }

  async create(user: User): Promise<User> {
    const { id, type, createdAt, updatedAt } = await this._prisma.user.create({
      data: {
        id: user.id,
        type: user.type,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return User.reconstruct({
      id,
      type,
      createdAt,
      updatedAt,
    });
  }
}
