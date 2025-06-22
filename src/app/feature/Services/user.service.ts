import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAssociate } from '../../Store/Models/IAssociate';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, IUserCred, IUserInfo } from '../../Store/Models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/users';
  private userSubject = new BehaviorSubject<IUserInfo | null>(this.getUserData());
  user$ = this.userSubject.asObservable();

  register(data: IUser): Observable<IUser> {
    return this._httpClient.post<IUser>(this.baseUrl, data);
  }

  login(data: IUserCred): Observable<IUserInfo[]> {
    return this._httpClient.get<IUserInfo[]>(`${this.baseUrl}?email=${data.email}&password=${data.password}`);
  }

  duplicateEmail(data: string): Observable<IUser[] | []> {
    return this._httpClient.get<IUser[] | []>(`${this.baseUrl}?email=${data}`);
  }

  saveInfo(data:IUserInfo){
    localStorage.setItem('user', JSON.stringify(data))
    this.userSubject.next(data);
  }

  getUserData(): IUserInfo | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) as IUserInfo : null;
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getAllUsers(): Observable<IUser[]>{
    return this._httpClient.get<IUser[]>(this.baseUrl)
  }

}
