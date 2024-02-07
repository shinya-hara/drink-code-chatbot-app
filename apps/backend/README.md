## 機能

- ユーザーがBotと対話できる
- ユーザーは複数のチャットルーム `ChatRoom` を持てる

## モデル

- `User` ユーザー（Supabase Authenticationで管理されているやつ）
- `ChatRoom` チャットルーム
- `ChatUserMessage` チャットルーム内のユーザーが発話した吹き出し1つ
- `ChatBotMessage` チャットルーム内のBotが発話した吹き出し1つ

## ルーティング

- `[GET] /messages` チャットログの取得
- `[POST] /messages` チャット内容の送信
