import { Injectable } from '@angular/core';
import { delay, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollBottomService {
  private scrollToBottomSubject = new Subject<void>();
  scrollToBottom$ = this.scrollToBottomSubject
    .asObservable()
    .pipe(delay(300));

  triggerScrollToBottom(): void {
    this.scrollToBottomSubject.next();
  }
}
