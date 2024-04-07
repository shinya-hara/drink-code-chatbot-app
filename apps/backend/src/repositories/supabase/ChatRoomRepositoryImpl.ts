import { ChatRoom } from '@/domains/entities/ChatRoom';
import { ChatRoomRepository } from '@/domains/repositories/ChatRoomRepository';
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
      ChatRoom.reconstruct({ id: chatRoom.id, name: chatRoom.name }),
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

    return ChatRoom.reconstruct({ id: _chatRoom.id, name: _chatRoom.name });
  }
}
