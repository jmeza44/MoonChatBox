import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from '../shared/models/chat-message.model';
import { DatePipe } from '@angular/common';
import { ScrollBottomService } from '../chat-messages-container/scroll-bottom.service';

@Component({
  selector: 'moon-message',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit {
  @Input() message!: ChatMessage;

  constructor(private scrollBottomService: ScrollBottomService) {}

  ngOnInit(): void {
    this.scrollBottomService.triggerScrollToBottom();
  }
}
