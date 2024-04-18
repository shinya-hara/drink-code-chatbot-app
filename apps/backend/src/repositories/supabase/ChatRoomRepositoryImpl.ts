import { ChatRoom } from '@/domains/entities/ChatRoom';
import { ChatRoomRepository } from '@/domains/repositories/ChatRoomRepository';
import { ChatRoomName } from '@/domains/valueObject/ChatRoomName';
import { ChatRoomId } from '@/domains/valueObject/ChatRoomId';
import { PrismaClient } from '@prisma/client';
import { UserId } from '@/domains/valueObject/UserId';

export class ChatRoomRepositoryImpl implements ChatRoomRepository {
  constructor(private _prisma: PrismaClient) {}

  async findMany(userId: UserId): Promise<ChatRoom[]> {
    const _usersChatRooms = await this._prisma.usersChatRooms.findMany({
      where: {
        userId: userId.value,
      },
      include: {
        chatRoom: true,
      },
    });

    return _usersChatRooms.map(({ chatRoom }) =>
      ChatRoom.reconstruct({
        id: new ChatRoomId(chatRoom.id),
        name: new ChatRoomName(chatRoom.name),
      }),
    );
  }

  async create(userId: UserId, name: ChatRoomName): Promise<ChatRoom> {
    const _chatRoom = await this._prisma.chatRoom.create({
      data: {
        id: crypto.randomUUID(),
        name: name.value,
      },
    });
    await this._prisma.usersChatRooms.create({
      data: {
        userId: userId.value,
        chatRoomId: _chatRoom.id,
      },
    });

    return ChatRoom.reconstruct({
      id: new ChatRoomId(_chatRoom.id),
      name: new ChatRoomName(_chatRoom.name),
    });
  }
}
