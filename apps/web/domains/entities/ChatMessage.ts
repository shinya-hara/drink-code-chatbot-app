type DateString = string;
export type ChatMessage = {
  id: string;
  chatRoomId: string;
  userId: string;
  content: {
    type: "text";
    text: string;
  };
  createdAt: DateString;
};
