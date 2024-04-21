export class ChatMessageId {
  constructor(private _value: number) {}

  get value() {
    return this._value;
  }
}
