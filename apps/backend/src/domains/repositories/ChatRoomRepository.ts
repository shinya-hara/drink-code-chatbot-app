import { ChatRoom } from '../entities/ChatRoom';
import { UserId } from '../valueObject/UserId';
import { ChatRoomName } from '../valueObject/ChatRoomName';

export interface ChatRoomRepository {
  findMany(userId: UserId): Promise<ChatRoom[]>;
  create(userId: UserId, name: ChatRoomName): Promise<ChatRoom>;
}
