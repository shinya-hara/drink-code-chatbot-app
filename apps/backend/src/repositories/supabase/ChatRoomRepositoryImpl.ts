import { ChatRoom } from '@/domains/entities/ChatRoom';
import { ChatRoomRepository } from '@/domains/repositories/ChatRoomRepository';
import { ChatRoomName } from '@/domains/valueObject/ChatRoomName';
import { ChatRoomId } from '@/domains/valueObject/chatRoomId';
import { PrismaClient } from '@prisma/client';

export class ChatRoomRepositoryImpl implements ChatRoomRepository {
  constructor(private _prisma: PrismaClient) {}

  async findMany(userId: string): Promise<ChatRoom[]> {
    const _usersChatRooms = await this._prisma.usersChatRooms.findMany({
      where: {
        userId,
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

  async create(userId: string, name: string): Promise<ChatRoom> {
    const _chatRoom = await this._prisma.chatRoom.create({
      data: {
        id: crypto.randomUUID(),
        name,
      },
    });
    await this._prisma.usersChatRooms.create({
      data: {
        userId,
        chatRoomId: _chatRoom.id,
      },
    });

    return ChatRoom.reconstruct({
      id: new ChatRoomId(_chatRoom.id),
      name: new ChatRoomName(_chatRoom.name),
    });
  }
}
