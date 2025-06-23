import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAssociate } from '../../Store/Models/IAssociate';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { IUser, IUserCred } from '../../Store/Models/IUser';
import { ILoginResponse } from '../../Store/Models/IAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _httpClient = inject(HttpClient);
  private baseUserUrl = 'http://localhost:3000/users';
  private baseAssociateUrl = 'http://localhost:3000/associates';
  private baseAdminUrl = 'http://localhost:3000/admin';

  private userSubject = new BehaviorSubject<ILoginResponse | null>(this.getUserData());
  user$ = this.userSubject.asObservable();

  register(data: IUser): Observable<IUser> {
    return this._httpClient.post<IUser>(this.baseUserUrl, data);
  }

  login(data: IUserCred): Observable<ILoginResponse> {
    return this._httpClient.get<IUser[]>(`${this.baseAdminUrl}?email=${data.email}`).pipe(
      switchMap(admins => {
        if (admins.length && admins[0].password === data.password) {
          return of({ user: admins[0], role: 'admin' as const });
        }

        // Check regular users
        return this._httpClient.get<IUser[]>(`${this.baseUserUrl}?email=${data.email}`).pipe(
          switchMap(users => {
            if (users.length && users[0].password === data.password) {
              return of({ user: users[0], role: 'user' as const });
            }

            // Check associates
            return this._httpClient.get<IAssociate[]>(`${this.baseAssociateUrl}?email=${data.email}`).pipe(
              map(associates => {
                if (associates.length && associates[0].password === data.password) {
                  return { user: associates[0], role: 'associate' as const };
                }
                throw new Error('Email or password incorrect');
              })
            );
          })
        );
      }),
      catchError(err => throwError(() => new Error(err.message)))
    );
  }

  duplicateEmail(email: string): Observable<IUser[] | []> {
    return this._httpClient.get<IUser[] | []>(`${this.baseUserUrl}?email=${email}`);
  }

  saveInfo(data: ILoginResponse) {
    localStorage.setItem('user', JSON.stringify(data));
    this.userSubject.next(data);
  }

  getUserData(): ILoginResponse | null {
    const user = localStorage.getItem('user');
    try {
      const parsed = user ? JSON.parse(user) : null;
      if (parsed && parsed.user && parsed.role) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
