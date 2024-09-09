import { ChatMessage } from './chat-message.model';
import { UserSession } from './user-session.model';

export interface ChatMessageGroup {
  sender: UserSession;
  pictureUrl: string;
  messages: ChatMessage[];
}
