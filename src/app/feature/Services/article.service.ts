import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IArticle } from '../../Store/Models/IArticle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/articles';

  getArticles(): Observable<IArticle[]> {
    return this._httpClient.get<IArticle[]>(this.baseUrl);
  }

  // addArticle(data: IArticle): Observable<IArticle> {
  //   return this._httpClient.post<IArticle>(this.baseUrl, data);
  // }

  // editArticle(data: IArticle, id: number): Observable<IArticle> {
  //   return this._httpClient.put<IArticle>(`${this.baseUrl}/${id}`, data);
  // }

  // deleteArticle(id: number): Observable<void> {
  //   return this._httpClient.delete<void>(`${this.baseUrl}/${id}`);
  // }
}
