import { type ChatMessage } from '../entities/ChatMessage';
import { type UserId } from '../valueObject/UserId';
import { type ChatRoomId } from '../valueObject/ChatRoomId';

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
