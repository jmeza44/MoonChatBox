import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { UserSession } from '../models/user-session.model';

@Injectable({
  providedIn: 'root'
})
export class ChatHubService {
  private readonly chatHubUrl = `${environment.apiBaseUrl}/ChatHub`;
  private messageSubject = new Subject<{ chatId: number, message: string, receivedAt: Date, userSession: UserSession; }>();
  private userJoinedSubject = new Subject<{ userNickname: string, chatId: number; }>();
  private userLeftSubject = new Subject<{ userNickname: string, chatId: number; }>();

  message$ = this.messageSubject.asObservable();
  userJoined$ = this.userJoinedSubject.asObservable();
  userLeft$ = this.userLeftSubject.asObservable();

  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.chatHubUrl, {
        withCredentials: false,
        headers: {
          'Access-Control-Allow-Credentials': 'true'
        } as signalR.MessageHeaders
      } as signalR.IHttpConnectionOptions)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.on('ReceiveMessage', (chatId: number, message: string, receivedAt: Date, userSession: UserSession) => {
      this.messageSubject.next({ chatId, message, receivedAt, userSession });
    });

    this.hubConnection.on('UserJoined', (userNickname: string, chatId: number) => {
      this.userJoinedSubject.next({ userNickname, chatId });
    });

    this.hubConnection.on('UserLeft', (userNickname: string, chatId: number) => {
      this.userLeftSubject.next({ userNickname, chatId });
    });
  }

  startConnection() {
    this.hubConnection.start()
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  sendMessage(message: string, userNickname: string, chatId: number): void {
    this.hubConnection.invoke('SendMessage', message, userNickname, chatId)
      .catch(err => console.error(err));
  }

  joinChat(chatId: number, userNickname: string): void {
    this.hubConnection.invoke('JoinChat', chatId, userNickname)
      .catch(err => console.error(err));
  }

  leaveChat(chatId: number, userNickname: string): void {
    this.hubConnection.invoke('LeaveChat', chatId, userNickname)
      .catch(err => console.error(err));
  }
}
