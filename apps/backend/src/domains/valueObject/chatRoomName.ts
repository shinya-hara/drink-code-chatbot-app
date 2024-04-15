export class ChatRoomName {
  constructor(private _value: string) {
    // TODO: ユーザー名のバリデーションがあれば追加
  }

  get value() {
    return this._value;
  }
}
