type DateString = string;
export type ChatMessage = {
  id: number;
  chatRoomId: string;
  userId: string;
  content: {
    type: "text";
    text: string;
  };
  createdAt: DateString;
};
