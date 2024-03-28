import { ResolveUserUseCase } from './resolveUserUseCase';
import { UserRepositoryImpl } from '../repositories/inMemory/UserRepositoryImpl';
import { User } from '../domains/entities/User';

describe('resolveUserUseCaseV2', () => {
  it('ユーザーが見つかれば、そのユーザーを返す', async () => {
    // given
    const users = [
      User.create({
        id: '1',
        type: 'USER',
      }),
    ];
    const repository = new UserRepositoryImpl(users);
    const spy = jest.spyOn(repository, 'create');
    const useCase = new ResolveUserUseCase(repository);

    // when
    const user = await useCase.execute('1');

    // then
    expect(spy).not.toHaveBeenCalled();
    expect(user.id).toBe('1');
    expect(user.type).toBe('USER');
  });

  it('ユーザーが見つからなければ、新たに作成されたユーザーを返す', async () => {
    // given
    const users = [
      User.create({
        id: '1',
        type: 'USER',
      }),
    ];
    const repository = new UserRepositoryImpl(users);
    const spy = jest.spyOn(repository, 'create');
    const useCase = new ResolveUserUseCase(repository);

    // when
    const user = await useCase.execute('2');

    // then
    expect(spy).toHaveBeenCalledTimes(1);
    expect(user.id).toBe('2');
    expect(user.type).toBe('USER');
  });
});
