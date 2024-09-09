import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserSessionService } from '../services/user-session.service';
import { lastValueFrom } from 'rxjs';

export const sessionInitializedGuard: CanActivateFn = async (route, state) => {
  const userSessionService = inject(UserSessionService);
  const router = inject(Router);

  const userSession = await lastValueFrom(userSessionService.getUserSession());
  if (!userSession) {
    router.navigate(['/', 'signIn']);
    return false;
  }

  return true;
};
