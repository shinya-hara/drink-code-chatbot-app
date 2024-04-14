import { ChatMessage } from '../entities/ChatMessage';

export interface ChatMessageRepository {
  findMany({
    userId,
    chatRoomId,
  }: {
    userId: string;
    chatRoomId: string;
  }): Promise<ChatMessage[]>;

  create(chatMessage: ChatMessage): Promise<ChatMessage>;
}
