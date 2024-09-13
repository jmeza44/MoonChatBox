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

    this.chatHubService.userConnection$.subscribe({
      next: (userConnected: boolean) => {
        const notification = userConnected ? 'Connected' : 'Disconnected';
        this.toastAlertsService.information(`A User ${notification}!`, 5000);
      }
    });
  }
}
