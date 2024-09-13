import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../models/chat.model';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { utcDateToLocalDate } from '../utilities/utc-date-to-local-date';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly controllerUrl = `${environment.apiBaseUrl}/api/Chat`;
  private chats: Chat[] = [];

  constructor(private http: HttpClient) {}

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.controllerUrl}/GetAll`)
      .pipe(map((chats: Chat[]): Chat[] => chats.map(chat => ({
        ...chat,
        joined: false,
        lastMessageSentAt: utcDateToLocalDate(chat.lastMessageSentAt),
      }))))
      .pipe(tap((chats: Chat[]) => this.chats = chats));
  }

  getChatName(chatId: number): string | null {
    return this.chats.find((chat) => chat.id === chatId)?.name ?? null;
  }

  joinChat(chatId: number, userNickname: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.controllerUrl}/ChatAction`, { chatId, userNickname, isJoining: true });
  }

  leaveChat(chatId: number, userNickname: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.controllerUrl}/ChatAction`, { chatId, userNickname, isJoining: false });
  }
}
