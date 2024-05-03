export class ChatRoomName {
  private _value: string;

  constructor(_value: string) {
    _value = _value.trim();

    if (_value.length < 1) {
      throw new Error('ChatRoomName must be at least 1 characters');
    }

    this._value = _value;
  }

  get value() {
    return this._value;
  }
}
