import { ChatRoomId } from '../valueObject/ChatRoomId';
import { type ChatRoomName } from '../valueObject/ChatRoomName';

export class ChatRoom {
  private constructor(
    private _id: ChatRoomId,
    private _name: ChatRoomName,
  ) {}

  static create({ name }: { name: ChatRoomName }) {
    const id = new ChatRoomId(crypto.randomUUID());
    return new ChatRoom(id, name);
  }

  static reconstruct({ id, name }: { id: ChatRoomId; name: ChatRoomName }) {
    return new ChatRoom(id, name);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
}
