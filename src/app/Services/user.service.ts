import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAssociate } from '../Store/Models/IAssociate';
import { Observable } from 'rxjs';
import { IUser, IUserCred, IUserInfo } from '../Store/Models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/users';

  // getAssociates(): Observable<IAssociate[]> {
  //   return this._httpClient.get<IAssociate[]>(this.baseUrl);
  // }

  register(data: IUser): Observable<IUser> {
    return this._httpClient.post<IUser>(this.baseUrl, data);
  }

  login(data: IUserCred): Observable<IUserInfo[]> {
    return this._httpClient.get<IUserInfo[]>(`${this.baseUrl}?email=${data.email}&password=${data.password}`);
  }

  duplicateEmail(data: string): Observable<IUser[] | []> {
    return this._httpClient.get<IUser[] | []>(`${this.baseUrl}?email=${data}`);
  }



}
