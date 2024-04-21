import { type ChatRoom } from '../entities/ChatRoom';
import { type UserId } from '../valueObject/UserId';
import { type ChatRoomName } from '../valueObject/ChatRoomName';

export interface ChatRoomRepository {
  findMany(userId: UserId): Promise<ChatRoom[]>;
  create(userId: UserId, name: ChatRoomName): Promise<ChatRoom>;
}
