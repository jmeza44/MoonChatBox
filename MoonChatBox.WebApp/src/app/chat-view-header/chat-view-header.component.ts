import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'moon-chat-view-header',
  standalone: true,
  imports: [],
  templateUrl: './chat-view-header.component.html'
})
export class ChatViewHeaderComponent {
  @Input() chatId!: number;
  @Input() title: string = '';
  @Input() joined: boolean = false;
  @Output() leaveChat: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  onLeave() {
    this.leaveChat.emit();
  }
}
