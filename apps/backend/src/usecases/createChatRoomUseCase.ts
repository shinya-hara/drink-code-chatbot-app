import { PrismaClient, type User, type ChatRoom } from '@prisma/client';

export class CreateChatRoomUseCase {
  constructor(private prisma: PrismaClient) {}

  async execute({
    user,
    name,
  }: {
    user: User;
    name: string;
  }): Promise<ChatRoom> {
    const chatRoom = await this.prisma.chatRoom.create({
      data: {
        id: crypto.randomUUID(),
        name,
      },
    });
    await this.prisma.usersChatRooms.create({
      data: {
        userId: user.id,
        chatRoomId: chatRoom.id,
      },
    });

    return chatRoom;
  }
}
