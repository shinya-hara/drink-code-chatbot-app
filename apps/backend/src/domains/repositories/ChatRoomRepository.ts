import { ChatRoom } from '../entities/ChatRoom';
import { UserId } from '../valueObject/userId';
import { ChatRoomName } from '../valueObject/chatRoomName';

export interface ChatRoomRepository {
  findMany(userId: UserId): Promise<ChatRoom[]>;
  create(userId: UserId, name: ChatRoomName): Promise<ChatRoom>;
}
