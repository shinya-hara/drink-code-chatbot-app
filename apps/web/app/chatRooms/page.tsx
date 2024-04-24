"use client";
import { useState, useEffect } from "react";
import { customFetch } from "@/utils/fetch";
import Link from "next/link";
import { ChatRoom } from "@/domains/entities/ChatRoom";

export default function ChatRooms() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const createChatRoom = async (name: string) => {
    customFetch
      .post("/chat-rooms", { name })
      .then((res) => res.json())
      .then((res: { message: string }) => {
        console.log("Success", res);
      });
  };

  const getChatRooms = async () => {
    customFetch
      .get("/chat-rooms")
      .then((res) => res.json())
      .then((res) => {
        console.log("Success", res);
        setChatRooms(res);
      });
  };

  useEffect(() => {
    getChatRooms();
  }, []);

  return (
    <div>
      <h1>Chat Rooms</h1>

      <ul>
        {chatRooms.map((chatRoom) => {
          return (
            <li key={chatRoom.id}>
              <Link
                href={`/chatRooms/${chatRoom.id}`}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                {chatRoom.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const name = formData.get("chat-room-name");
          if (typeof name !== "string") return;
          createChatRoom(name);
        }}
      >
        <input type="text" name="chat-room-name" />
        <button
          className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          type="submit"
        >
          Create new chat room!
        </button>
      </form>
    </div>
  );
}
