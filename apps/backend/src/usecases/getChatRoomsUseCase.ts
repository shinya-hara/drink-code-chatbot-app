import { PrismaClient, type User, type UsersChatRooms } from '@prisma/client';

export class GetChatRoomsUseCase {
  constructor(private prisma: PrismaClient) {}

  async execute({ user }: { user: User }): Promise<UsersChatRooms[]> {
    const chatRooms = await this.prisma.usersChatRooms.findMany({
      where: {
        userId: user.id,
      },
      include: {
        chatRoom: true,
      },
    });

    return chatRooms;
  }
}
