export interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageSentAt: Date;
  pictureUrl: string;

  joined: boolean;
}
