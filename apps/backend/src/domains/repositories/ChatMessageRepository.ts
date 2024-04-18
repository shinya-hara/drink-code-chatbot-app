import { ChatMessage } from '../entities/ChatMessage';
import { UserId } from '../valueObject/userId';
import { ChatRoomId } from '../valueObject/chatRoomId';

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
