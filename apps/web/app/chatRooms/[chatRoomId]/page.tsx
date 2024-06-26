"use client";
import { useParams } from "next/navigation";
import { customFetch } from "@/utils/fetch";
import { useEffect, useState } from "react";
import { createClient, type User } from "@/utils/supabase/client";
import { type ChatMessage } from "@/domains/entities/ChatMessage";
import {
  RealtimeChannel,
  RealtimePostgresInsertPayload,
} from "@supabase/supabase-js";

type DateString = string;

type NewChatMessage = {
  chatRoomId: string;
  content: Content;
  createdAt: DateString;
  id: number;
  updatedAt: DateString;
  userId: string;
};

export type Content = {
  type: "text";
  text: string;
};

export default function ChatRoom() {
  const { chatRoomId } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClient();

  const getChatMessages = async () => {
    return customFetch
      .get(`/chat-rooms/${chatRoomId}/messages`)
      .then((res) => res.json())
      .then((res: { messages: ChatMessage[] }) => {
        setMessages(res.messages);
        return res.messages;
      });
  };

  const postChatMessage = async (message: string) => {
    await customFetch
      .post("/messages", { message, chatRoomId })
      .then((res) => res.json());
  };

  const handleInsertsCreator = (messages: ChatMessage[]) => {
    return (payload: RealtimePostgresInsertPayload<NewChatMessage>) => {
      const { id, chatRoomId, content, createdAt, userId } = payload.new;
      const newMessage: ChatMessage = {
        id,
        chatRoomId,
        content,
        createdAt,
        userId,
      };
      setMessages([...messages, newMessage]);
    };
  };

  useEffect(() => {
    let channel: RealtimeChannel | undefined;

    getChatMessages().then((messages: ChatMessage[]) => {
      channel = supabase
        .channel("ChatMessage")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "ChatMessage" },
          handleInsertsCreator(messages)
        )
        .subscribe();
    });

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    return () => {
      channel?.unsubscribe();
    };
  }, []);

  const ChatMessage = ({ message }: { message: ChatMessage }) => {
    /** 自分が送信したチャットメッセージかどうか */
    const isMine = message.userId === user?.id;

    const now = new Date();
    const createdAt = new Date(message.createdAt);
    /** チャット送信日が今日かどうか */
    const isTodaysMessage =
      now.toLocaleDateString() === createdAt.toLocaleDateString();
    const date = isTodaysMessage
      ? createdAt.toLocaleTimeString() // 今日の場合は時刻のみ
      : createdAt.toLocaleString(); // それ以外は日付と時刻

    return (
      <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
        <div className="flex flex-col gap-1">
          <div className="inline-block bg-white rounded px-2 py-1">
            <p>{message.content.text}</p>
          </div>
          <div className="text-xs text-gray-500 text-right">{date}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="text-center">
        <p>ルームID:{chatRoomId}</p>

        <div className="bg-slate-300 h-96 w-full p-4">
          {user && (
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const message = formData.get("chat-room-message");
          if (typeof message !== "string") return;
          postChatMessage(message);
        }}
        className="bg-slate-300 justify-center flex gap-2 w-full py-4"
      >
        <input type="text" name="chat-room-message" />
        <button
          className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          type="submit"
        >
          post message!
        </button>
      </form>
    </div>
  );
}
