import { ChatMessage } from '@/domains/entities/ChatMessage';
import { User } from '@/domains/entities/User';
import { ChatMessageRepository } from '@/domains/repositories/ChatMessageRepository';
import { PrismaClient } from '@prisma/client';

export class ChatMessageRepositoryImpl implements ChatMessageRepository {
  constructor(private _prisma: PrismaClient) {}

  async findMany({
    userId,
    chatRoomId,
  }: {
    userId: string;
    chatRoomId: string;
  }): Promise<ChatMessage[]> {
    const result = await this._prisma.chatMessage.findMany({
      where: {
        userId,
        chatRoomId,
      },
      include: {
        user: true,
      },
    });

    const chatMessages = result.map(
      ({ id, content, chatRoomId, createdAt, user: rawUser }) => {
        if (typeof content !== 'string') throw new Error();
        const user = User.reconstruct({
          id: rawUser.id,
          type: rawUser.type,
          createdAt: rawUser.createdAt,
          updatedAt: rawUser.updatedAt,
        });

        return ChatMessage.reconstruct({
          id,
          content,
          user,
          chatRoomId,
          createdAt,
        });
      },
    );

    return chatMessages;
  }

  async create(chatMessage: ChatMessage): Promise<ChatMessage> {
    await this._prisma.chatMessage.create({
      data: {
        userId: chatMessage.user.id,
        content: chatMessage.content,
        chatRoomId: chatMessage.chatRoomId,
        createdAt: chatMessage.createdAt,
        updatedAt: chatMessage.createdAt,
      },
    });

    return chatMessage;
  }
}
