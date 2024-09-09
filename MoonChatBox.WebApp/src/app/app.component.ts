import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatHubService } from './shared/services/chat-hub.service';
import { ToastsAlertsComponent } from './toasts-alerts/toasts-alerts.component';
import { ToastAlertsService } from './shared/services/toast-alerts.service';
import { ChatService } from './shared/services/chat.service';

@Component({
  selector: 'moon-root',
  standalone: true,
  imports: [RouterOutlet, ToastsAlertsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private chatHubService: ChatHubService,
    private toastAlertsService: ToastAlertsService,
  ) {}

  ngOnInit(): void {
    this.chatHubService.startConnection();

    this.chatHubService.userJoined$.subscribe({
      next: (user) => {
        const chatName: string | null = this.chatService.getChatName(user.chatId);
        if (chatName !== null) this.toastAlertsService.information(`${user.userNickname} have joined the chat ${chatName}!`, 5000);
        else this.toastAlertsService.information(`${user.userNickname} have joined a chat!`, 5000);

      },
    });
    this.chatHubService.userLeft$.subscribe({
      next: (user) => {
        const chatName: string | null = this.chatService.getChatName(user.chatId);
        if (chatName !== null) this.toastAlertsService.information(`${user.userNickname} have leaved the chat ${chatName}!`, 5000);
        else this.toastAlertsService.information(`${user.userNickname} have leaved a chat!`, 5000);
      },
    });
  }
}
