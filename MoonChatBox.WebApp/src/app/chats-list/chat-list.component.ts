import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chat } from '../shared/models/chat.model';
import { ChatListItemComponent } from '../chat-list-item/chat-list-item.component';
import { ChatHubService } from '../shared/services/chat-hub.service';

@Component({
  selector: 'moon-chat-list',
  standalone: true,
  imports: [ChatListItemComponent],
  templateUrl: './chat-list.component.html',
  styles: ``
})
export class ChatListComponent implements OnInit {
  @Input() chats!: Chat[];
  @Output() clickOnItem: EventEmitter<number> = new EventEmitter<number>();

  constructor(private chatHubService: ChatHubService) {}

  ngOnInit(): void {
    this.chatHubService.message$.subscribe({
      next: (messageReceived) => {
        const chat = this.chats.find(chat => chat.id === messageReceived.chatId);
        if (chat !== undefined) {
          chat.lastMessage = messageReceived.message;
          chat.lastMessageSentAt = messageReceived.receivedAt;
        }
      }
    });
  }

  onItemClicked(chatId: number) {
    this.clickOnItem.emit(chatId);
  }
}
