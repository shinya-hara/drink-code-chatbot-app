export class ChatRoom {
  private constructor(
    private _id: string,
    private _name: string,
  ) {}

  static create({ name }: { name: string }) {
    const id = crypto.randomUUID();
    return new ChatRoom(id, name);
  }

  static reconstruct({ id, name }: { id: string; name: string }) {
    return new ChatRoom(id, name);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
}
