"use client";
import { useParams } from "next/navigation";
import { customFetch } from "@/utils/fetch";

export default function ChatRoom() {
  const { chatRoomId } = useParams();

  const postChatMessage = async (message: string) => {
    await customFetch
      .post("message", { message })
      .then((res) => res.json())
      .then((res: { message: string }) => {
        console.log("Success", res);
      });
  };
  return (
    <div>
      <div className="text-center">
        <p>ルームID:{chatRoomId}</p>
        <div className="bg-slate-300 h-96 w-full">{/* 過去のメッセージ */}</div>
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
