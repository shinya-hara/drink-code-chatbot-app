import { PrismaClient } from '@prisma/client';
import { ResolveUserUseCase } from './resolveUserUseCase';
import { UserRepositoryImpl } from '../repositories/UserRepositoryImpl';
import { User } from '../domains/entities/User';

describe('resolveUserUseCase', () => {
  it('ユーザーが見つかれば、そのユーザーを返す', async () => {
    // given
    const existedUser = User.create({
      id: '1',
      type: 'USER',
    });

    const mockPrisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue(existedUser),
        create: jest.fn().mockResolvedValue(
          User.create({
            id: '2',
            type: 'USER',
          }),
        ),
      },
    };

    const useCase = new ResolveUserUseCase(
      new UserRepositoryImpl(mockPrisma as unknown as PrismaClient),
    );

    // when
    const user = await useCase.execute('userId');

    // then
    expect(user).toEqual(existedUser);
  });
  it('ユーザーが見つからなければ、新たに作成されたユーザーを返す', async () => {
    // given
    const createdUser = User.create({
      id: '2',
      type: 'USER',
    });

    const mockPrisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue(undefined),
        create: jest.fn().mockResolvedValue(createdUser),
      },
    };

    const useCase = new ResolveUserUseCase(
      new UserRepositoryImpl(mockPrisma as unknown as PrismaClient),
    );

    // when
    const user = await useCase.execute('userId');

    // then
    expect(user).toEqual(createdUser);
  });
});
