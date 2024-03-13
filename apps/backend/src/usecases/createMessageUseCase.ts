import { PrismaClient, type User, type ChatRoom } from '@prisma/client';
export class CreateMessageUseCase {
  constructor(private prisma: PrismaClient) {}

  /**
   * メッセージの作成
   */
  public async execute({
    message,
    user,
    chatRoomId,
  }: {
    message: string;
    user: User;
    chatRoomId: string;
  }) {
    /**
     * contentの型
     * {
     *    type: 'text',
     *    text: 'message text'
     * }
     */
    const chatMessage = await this.prisma.chatMessage.create({
      data: {
        userId: user.id,
        content: JSON.stringify({
          type: 'text',
          text: message,
        }),
        chatRoomId: chatRoomId,
      },
    });

    return chatMessage;
  }
}
