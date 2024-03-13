"use client";

export default function ChatRooms() {
  const createChatRoom = async (name: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat-rooms`, {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res: { message: string }) => {
        console.log("Success", res);
      });
  };

  return (
    <div>
      <h1>Chat Rooms</h1>

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
