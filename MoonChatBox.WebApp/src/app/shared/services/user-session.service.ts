import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSession } from '../models/user-session.model';
import { environment } from '../../../environments/environment';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserSessionService {
  private readonly userStorageKey = 'user';
  private readonly controllerUrl = `${environment.apiBaseUrl}/api/UserSession`;

  constructor(private httpClient: HttpClient) {}

  getUserSession(id: string | undefined = undefined): Observable<UserSession | null> {
    if (!id) {
      const userSessionSerialized = localStorage.getItem(this.userStorageKey);
      if (userSessionSerialized === null) return of(null);
      return of(JSON.parse(userSessionSerialized) as UserSession);
    }
    return this.httpClient.get<UserSession>(`${this.controllerUrl}/GetUserSession`, { params: { id: id.toString() } });
  }

  initUserSession(nickname: string, avatar: string): Observable<UserSession> {
    return this.httpClient.post<number>(`${this.controllerUrl}/InitUserSession`, { nickname, avatar })
      .pipe(map(id => ({ id, nickname, avatar } as UserSession)))
      .pipe(tap(userSession => localStorage.setItem(this.userStorageKey, JSON.stringify(userSession))));
  }

  finishUserSession(): void {
    localStorage.removeItem(this.userStorageKey);
  }
}
