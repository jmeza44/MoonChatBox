import { Routes } from '@angular/router';
import { ChatBoxDashboardComponent } from './chat-box-dashboard/chat-box-dashboard.component';
import { sessionInitializedGuard } from './shared/guards/session-initialized.guard';
import { SignInViewComponent } from './sign-in-view/sign-in-view.component';

export const routes: Routes = [
  {
    path: '',
    component: ChatBoxDashboardComponent,
    canActivate: [sessionInitializedGuard]
  },
  {
    path: 'signIn',
    component: SignInViewComponent
  }
];
