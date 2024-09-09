import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chat } from '../shared/models/chat.model';
import { DatePipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'moon-chat-list-item',
  standalone: true,
  imports: [NgOptimizedImage, DatePipe],
  templateUrl: './chat-list-item.component.html',
  styles: ``
})
export class ChatListItemComponent {
  @Input() chat!: Chat;
  @Output() itemClicked: EventEmitter<number> = new EventEmitter<number>();

  onClick(id: number) {
    this.itemClicked.emit(id);
  }
}
