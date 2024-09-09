import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ChatMessageGroup } from '../shared/models/chat-message-group.model';
import { MessageGroupComponent } from '../message-group/message-group.component';
import { ScrollBottomService } from './scroll-bottom.service';
import { Subscription } from 'rxjs';
import { UserSessionService } from '../shared/services/user-session.service';
import { UserSession } from '../shared/models/user-session.model';

@Component({
  selector: 'moon-chat-messages-container',
  standalone: true,
  imports: [MessageGroupComponent],
  templateUrl: './chat-messages-container.component.html',
  styles: `:host { display: contents; }`
})
export class ChatMessagesContainerComponent implements OnInit, AfterViewChecked, OnDestroy {
  @Input() chatMessagesGroups!: ChatMessageGroup[];
  @Input() joinedInChat: boolean = false;
  @Output() joinChat: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('chatContainer', { static: true }) private chatContainerRef!: ElementRef | undefined;
  private lastMessage: string = '';
  private mySession: UserSession | null = null;
  private scrollSubscription!: Subscription;


  constructor(
    private userSessionService: UserSessionService,
    private scrollBottomService: ScrollBottomService,
  ) {}

  ngOnInit(): void {
    this.userSessionService.getUserSession().subscribe({
      next: (userSession) => this.mySession = userSession,
    });

    this.scrollSubscription = this.scrollBottomService.scrollToBottom$
      .subscribe({
        next: this.scrollToBottom,
      });
  }

  ngAfterViewChecked(): void {
    const lastMessageGroup = this.chatMessagesGroups.at(-1);
    const lastMessage = lastMessageGroup?.messages.at(-1);
    const lastMessageContent = lastMessage?.content;
    if (this.lastMessage !== lastMessageContent && lastMessageContent !== undefined) {
      this.lastMessage = lastMessageContent;
      this.scrollToBottom();
    }
  }

  isMyMessage(messageSender: string): boolean { return this.mySession?.nickname === messageSender; }

  onJoinChatClicked() {
    this.joinChat.emit();
  }

  scrollToBottom(): void {
    const container = this.chatContainerRef?.nativeElement;
    console.log(container);
    if (container !== undefined && container !== null) {
      console.log(container.scrollTop);
      console.log(container.scrollHeight);
      container.scrollTop = container.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}
