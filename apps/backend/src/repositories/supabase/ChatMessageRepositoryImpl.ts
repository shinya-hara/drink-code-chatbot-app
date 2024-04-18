import { ChatMessage } from '@/domains/entities/ChatMessage';
import { User } from '@/domains/entities/User';
import { ChatMessageRepository } from '@/domains/repositories/ChatMessageRepository';
import { ChatMessageId } from '@/domains/valueObject/ChatMessageId';
import { ChatRoomId } from '@/domains/valueObject/chatRoomId';
import { UserId } from '@/domains/valueObject/userId';
import { PrismaClient } from '@prisma/client';

export class ChatMessageRepositoryImpl implements ChatMessageRepository {
  constructor(private _prisma: PrismaClient) {}

  async findMany({
    userId,
    chatRoomId,
  }: {
    userId: UserId;
    chatRoomId: ChatRoomId;
  }): Promise<ChatMessage[]> {
    const result = await this._prisma.chatMessage.findMany({
      where: {
        userId: userId.value,
        chatRoomId: chatRoomId.value,
      },
      include: {
        user: true,
      },
    });

    const chatMessages = result.map(
      ({ id, content, chatRoomId, createdAt, user: rawUser }) => {
        if (typeof content !== 'string') throw new Error();
        const user = User.reconstruct({
          id: new UserId(rawUser.id),
          type: rawUser.type,
          createdAt: rawUser.createdAt,
          updatedAt: rawUser.updatedAt,
        });

        return ChatMessage.reconstruct({
          id: new ChatMessageId(id),
          content,
          user,
          chatRoomId: new ChatRoomId(chatRoomId),
          createdAt,
        });
      },
    );

    return chatMessages;
  }

  async create(chatMessage: ChatMessage): Promise<ChatMessage> {
    await this._prisma.chatMessage.create({
      data: {
        userId: chatMessage.user.id.value,
        content: chatMessage.content,
        chatRoomId: chatMessage.chatRoomId.value,
        createdAt: chatMessage.createdAt,
        updatedAt: chatMessage.createdAt,
      },
    });

    return chatMessage;
  }
}
