import { ChatMessage } from '../entities/ChatMessage';
import { UserId } from '../valueObject/UserId';
import { ChatRoomId } from '../valueObject/ChatRoomId';

export interface ChatMessageRepository {
  findMany({
    userId,
    chatRoomId,
  }: {
    userId: UserId;
    chatRoomId: ChatRoomId;
  }): Promise<ChatMessage[]>;

  create(chatMessage: ChatMessage): Promise<ChatMessage>;
}
