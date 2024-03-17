"use client";
import { useState, useEffect } from "react";
import { customFetch } from "@/utils/fetch";

export default function ChatRooms() {
  // TODO: レスポンスの型を定義する
  const [chatRooms, setChatRooms] = useState([]);

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
        {chatRooms.map((chatRoom: any) => {
          return <li key={chatRoom.id}>{chatRoom.chatRoom.name}</li>;
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
