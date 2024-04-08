import { ChatRoom } from '@/domains/entities/ChatRoom';
import { User } from '@/domains/entities/User';
import { ChatRoomRepositoryImpl } from '@/repositories/supabase/ChatRoomRepositoryImpl';
import { GetChatRoomsUseCase } from '@/usecases/getChatRoomsUseCase';
import { PrismaClient } from '@prisma/client';

describe('getChatRoomsUseCase', () => {
  it('正しい引数がわたされているか', () => {
    // given
    const user = User.create({
      id: '1',
      type: 'USER',
    });
    const mockedClient = {
      usersChatRooms: {
        findMany: (userId: string) => [
          { chatRoom: { id: 1, name: 'ChatRoom1' } },
        ],
      },
    };

    const repository = new ChatRoomRepositoryImpl(
      mockedClient as unknown as PrismaClient,
    );
    const spy = jest.spyOn(repository, 'findMany');
    const usecase = new GetChatRoomsUseCase(repository);

    // when
    usecase.execute({ user });

    // then
    expect(spy).toHaveBeenCalledWith('1');
  });

  it.todo('ユーザーIDに対応するチャットルームが見つからなければ何も返さない');
});