import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../Store/Models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/users';

  getAllUsers(): Observable<IUser[]>{
    return this._httpClient.get<IUser[]>(this.baseUrl)
  }

}
