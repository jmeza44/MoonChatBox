import { UserSession } from './user-session.model';

export interface ChatMessage {
  id: number;
  content: string;
  sender: UserSession;
  sentAt: Date;
  chatId: number;
}
