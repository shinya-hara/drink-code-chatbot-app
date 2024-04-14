import { ChatMessageRepository } from '@/domains/repositories/ChatMessageRepository';
import { PrismaClient, type User } from '@prisma/client';

export class GetChatMessagesUseCase {
  constructor(
    private _repository: ChatMessageRepository,
    private prisma: PrismaClient,
  ) {}

  /**
   * チャットルームのメッセージを返す
   *
   * NOTE:
   * チャット件数が増えた際にページネーション機構の実装が必要かも？
   * Prisma がいい感じに処理してくれる場合は問題ないが仕様未調査
   *
   * FIXME:リファクタリング
   */
  async execute({ user, chatRoomId }: { user: User; chatRoomId: string }) {
    // 1. user がその chatRoom に属しているか確認
    const exists = await this.prisma.usersChatRooms.findUnique({
      where: {
        userId_chatRoomId: {
          userId: user.id,
          chatRoomId,
        },
      },
    });
    if (!exists) {
      return { messages: [] };
    }

    // 2. chatMessage を返す
    const messages = await this._repository.findMany({
      userId: user.id,
      chatRoomId,
    });
    return { messages };
  }
}
