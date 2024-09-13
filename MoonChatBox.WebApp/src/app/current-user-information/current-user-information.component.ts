import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserSession } from '../shared/models/user-session.model';
import { UserSessionService } from '../shared/services/user-session.service';

@Component({
  selector: 'moon-current-user-information',
  standalone: true,
  imports: [NgOptimizedImage, AsyncPipe],
  templateUrl: './current-user-information.component.html',
  styles: ``
})
export class CurrentUserInformationComponent implements OnInit {
  userSession: UserSession | null = null;
  updating: boolean = false;

  constructor(private userSessionService: UserSessionService) {
  }

  ngOnInit(): void {
    this.userSessionService.getUserSession().subscribe({ next: (userSession) => this.userSession = userSession });
  }

  toggleUpdating() {
    if (this.updating === false) {
      this.updating = true;
      setTimeout(() => this.updating = false, 3000);
    }
  }
}
