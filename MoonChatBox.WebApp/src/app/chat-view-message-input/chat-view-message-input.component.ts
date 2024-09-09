import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'moon-chat-view-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-view-message-input.component.html',
  styles: ``
})
export class ChatViewMessageInputComponent {
  @Input() disabled: boolean = false;
  @Output() messageSend: EventEmitter<string> = new EventEmitter<string>();

  message: string = '';

  onSendMessage() {
    if (this.message !== '') this.messageSend.emit(this.message);
    this.message = '';
  }
}
