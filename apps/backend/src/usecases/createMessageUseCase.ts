import { ChatMessageRepository } from '@/domains/repositories/ChatMessageRepository';
import { type User } from '@/domains/entities/User';
import { type ChatRoomId } from '@/domains/valueObject/ChatRoomId';
import { ChatMessage } from '@/domains/entities/ChatMessage';

export class CreateMessageUseCase {
  constructor(private _repository: ChatMessageRepository) {}

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
    chatRoomId: ChatRoomId;
  }) {
    const chatMessage = ChatMessage.create({
      content: { type: 'text', text: message },
      user,
      chatRoomId,
    });
    /**
     * contentの型
     * {
     *    type: 'text',
     *    text: 'message text'
     * }
     */
    return await this._repository.create(chatMessage);
  }
}
