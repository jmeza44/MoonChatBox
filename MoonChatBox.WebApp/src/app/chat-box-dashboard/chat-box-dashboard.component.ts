import { Component, OnInit } from '@angular/core';
import { ChatListComponent } from '../chats-list/chat-list.component';
import { CurrentUserInformationComponent } from '../current-user-information/current-user-information.component';
import { ChatViewHeaderComponent } from '../chat-view-header/chat-view-header.component';
import { ChatViewMessageInputComponent } from '../chat-view-message-input/chat-view-message-input.component';
import { Chat } from '../shared/models/chat.model';
import { ChatMessageGroup } from '../shared/models/chat-message-group.model';
import { ChatService } from '../shared/services/chat.service';
import { ChatMessagesContainerComponent } from '../chat-messages-container/chat-messages-container.component';
import { MessageService } from '../shared/services/message.service';
import { ChatHubService } from '../shared/services/chat-hub.service';
import { UserSessionService } from '../shared/services/user-session.service';
import { UserSession } from '../shared/models/user-session.model';
import { ToastAlertsService } from '../shared/services/toast-alerts.service';

@Component({
  selector: 'moon-chat-box-dashboard',
  standalone: true,
  imports: [
    CurrentUserInformationComponent,
    ChatListComponent,
    ChatViewHeaderComponent,
    ChatMessagesContainerComponent,
    ChatViewMessageInputComponent
  ],
  templateUrl: './chat-box-dashboard.component.html'
})
export class ChatBoxDashboardComponent implements OnInit {
  selectedChatId: number = 0;
  chats: Chat[] = [];
  chatMessagesGroups: ChatMessageGroup[] = [];

  get joinedInSelectedChat(): boolean { return this.chats.find((chat) => chat.id === this.selectedChatId)?.joined ?? false; }

  constructor(
    private chatService: ChatService,
    private chatHubService: ChatHubService,
    private messageService: MessageService,
    private userSessionService: UserSessionService,
    private toastAlertsService: ToastAlertsService,
  ) {}

  ngOnInit(): void {
    this.fetchChats();

    this.chatHubService.message$.subscribe(messageReceived => {
      if (messageReceived.chatId !== this.selectedChatId) return;

      const lastGroupOfMessages = this.chatMessagesGroups[this.chatMessagesGroups.length - 1];
      const senderIsSameAsLast = lastGroupOfMessages?.sender.nickname === messageReceived.userSession.nickname;

      if (this.chatMessagesGroups.length === 0 || !senderIsSameAsLast) {
        this.pushANewGroupOfMessages(messageReceived);
      } else {
        this.pushANewMessage(lastGroupOfMessages, messageReceived);
      }
    });
  }

  getChatName(chatId: number): string {
    return this.chats.find((chat) => chat.id === chatId)?.name ?? '';
  }

  onChatListItemClicked(chatId: number) {
    this.selectedChatId = chatId;
    this.fetchMessagesGrouped(chatId);
  }

  addNewMessage(message: string) {
    this.messageService.send(this.selectedChatId, message).subscribe();
  }

  joinChat() {
    this.userSessionService.getUserSession()
      .subscribe({
        next: (userSession: UserSession | null) => {
          if (userSession !== null) {
            this.chatService.joinChat(this.selectedChatId, userSession.nickname).subscribe({
              next: () => {
                this.chats.forEach((chat: Chat) => {
                  if (chat.id === this.selectedChatId) {
                    chat.joined = true;
                  }
                });
                this.fetchMessagesGrouped(this.selectedChatId);
              }
            });
            this.chatHubService.joinChat(this.selectedChatId, userSession.nickname);
          }
          else this.toastAlertsService.error("Cannot join the chat if you has not session. Try refreshing the page.");
        }
      });
  }

  onLeave() {
    this.userSessionService.getUserSession()
      .subscribe({
        next: (userSession: UserSession | null) => {
          if (userSession !== null) {
            this.chatService.leaveChat(this.selectedChatId, userSession.nickname).subscribe({
              next: () => {
                this.chats.forEach((chat: Chat) => {
                  if (chat.id === this.selectedChatId) {
                    chat.joined = false;
                    this.chatMessagesGroups = [];
                  }
                });
              }
            });
            this.chatHubService.leaveChat(this.selectedChatId, userSession.nickname);
          }
          else this.toastAlertsService.error("Cannot join the chat if you has not session. Try refreshing the page.");
        }
      });
  }

  private fetchChats() {
    this.chatService.getChats()
      .subscribe({
        next: (chats: Chat[]) => this.chats = chats,
      });
  }

  private fetchMessagesGrouped(chatId: number) {
    if (!this.joinedInSelectedChat) this.chatMessagesGroups = [];
    else this.messageService.getMessagesFromChat(chatId).subscribe({
      next: (chatMessagesGroups: ChatMessageGroup[]) => {
        this.chatMessagesGroups = chatMessagesGroups;
      },
    });
  }

  private pushANewMessage(lastGroupOfMessages: ChatMessageGroup, messageReceived: { chatId: number; message: string; receivedAt: Date; userSession: UserSession; }) {
    lastGroupOfMessages.messages.push({
      id: 0,
      chatId: messageReceived.chatId,
      content: messageReceived.message,
      sender: messageReceived.userSession,
      sentAt: messageReceived.receivedAt,
    });
  }

  private pushANewGroupOfMessages(messageReceived: { chatId: number; message: string; receivedAt: Date; userSession: UserSession; }) {
    this.chatMessagesGroups.push({
      messages: [{
        id: 0,
        chatId: messageReceived.chatId,
        content: messageReceived.message,
        sender: messageReceived.userSession,
        sentAt: messageReceived.receivedAt,
      }],
      pictureUrl: messageReceived.userSession.avatar,
      sender: messageReceived.userSession,
    });
  }
}
