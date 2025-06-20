import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAssociate } from '../../Store/Models/IAssociate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  private _httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/Associates';

  getAssociates(): Observable<IAssociate[]> {
    return this._httpClient.get<IAssociate[]>(this.baseUrl);
  }

  addAssociate(data: IAssociate): Observable<IAssociate> {
    return this._httpClient.post<IAssociate>(this.baseUrl, data);
  }

  editAssociate(data: IAssociate, id: number): Observable<IAssociate> {
    return this._httpClient.put<IAssociate>(`${this.baseUrl}/${id}`, data);
  }

  deleteAssociate(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
