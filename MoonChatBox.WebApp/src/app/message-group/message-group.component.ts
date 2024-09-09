import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ChatMessageGroup } from '../shared/models/chat-message-group.model';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'moon-message-group',
  standalone: true,
  imports: [NgOptimizedImage, MessageComponent],
  templateUrl: './message-group.component.html',
  styles: ``
})
export class MessageGroupComponent {
  @Input() chatMessageGroup!: ChatMessageGroup;
  @Input() isMirrored!: boolean;
}
