import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChatMessage } from '../models/chat-message.model';
import { map, Observable, switchMap } from 'rxjs';
import { ChatMessageGroup } from '../models/chat-message-group.model';
import { UserSessionService } from './user-session.service';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private readonly controllerUrl = `${environment.apiBaseUrl}/api/Message`;

  constructor(private http: HttpClient, private userSessionService: UserSessionService) {}

  getMessagesFromChat(chatId: number): Observable<ChatMessageGroup[]> {
    return this.http.get<ChatMessage[]>(`${this.controllerUrl}/GetMessagesFromChat`, {
      params: { chatId }
    }).pipe(map((messages) => this.groupMessagesBySender(messages)));
  }

  send(chatId: number, message: string): Observable<number> {
    return this.userSessionService.getUserSession()
      .pipe(switchMap(userSession => {
        if (userSession === null) {
          throw new Error("Unidentified");
        }
        return this.http.post<number>(`${this.controllerUrl}/Send`, {
          userSessionId: userSession.id,
          chatId,
          messageContent: message,
        });
      }));
  }

  private groupMessagesBySender(messages: ChatMessage[]): ChatMessageGroup[] {
    const groupedMessages: ChatMessageGroup[] = [];

    if (messages.length === 0) return groupedMessages;

    let currentGroup: ChatMessageGroup | null = null;

    for (const message of messages) {
      if (!currentGroup || currentGroup.sender.nickname !== message.sender.nickname) {
        if (currentGroup) {
          groupedMessages.push(currentGroup);
        }

        currentGroup = {
          sender: message.sender,
          pictureUrl: message.sender.avatar,
          messages: []
        };
      }

      if (currentGroup) {
        currentGroup.messages.push(message);
      }
    }

    if (currentGroup) {
      groupedMessages.push(currentGroup);
    }

    return groupedMessages;
  }
}
