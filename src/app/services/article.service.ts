import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleDTO } from '../models/article-dto';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) { }

  create(articleDTO: ArticleDTO) {
    return this.http.post<ArticleDTO>(`${environment.articleUrl}/${localStorage.getItem('userId')}`, articleDTO);
  }

  find(articleId: string): Observable<ArticleDTO> {
    return this.http.get<ArticleDTO>(`${environment.articleUrl}/${articleId}/${localStorage.getItem('userId')}`);
  }

  findAll(): Observable<[ArticleDTO]> {
    return this.http.get<[ArticleDTO]>(`${environment.articleUrl}/${localStorage.getItem('userId')}`);
  }

  findAllOccurences(articleId:string): Observable<string[]>{
    return this.http.get<string[]>(`${environment.articleUrl}/findAllOccurences/${localStorage.getItem('userId')}/${articleId}`);
  }

  update(articleDTO: ArticleDTO): Observable<ArticleDTO> {
    return this.http.put<ArticleDTO>(`${environment.articleUrl}/${localStorage.getItem('userId')}`, articleDTO);
  }

  delete(articleId: string) {
    return this.http.delete(`${environment.articleUrl}/${articleId}/${localStorage.getItem('userId')}`);
  }
}
