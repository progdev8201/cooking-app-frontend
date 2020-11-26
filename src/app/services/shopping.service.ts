import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoutineArticleDTO } from '../models/routine-article-dto';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http:HttpClient) { }

  updateShoppingList(shoppingListArticles:RoutineArticleDTO[]):Observable<RoutineArticleDTO[]>{
    return this.http.put<RoutineArticleDTO[]>(`${environment.shoppingUrl}/${localStorage.getItem('userId')}`,shoppingListArticles);
  }

  findAll():Observable<RoutineArticleDTO[]>{
    return this.http.get<RoutineArticleDTO[]>(`${environment.shoppingUrl}/${localStorage.getItem('userId')}`);
  }

  shop(){
    return this.http.get(`${environment.shoppingUrl}/shopAll/${localStorage.getItem('userId')}`);
  }
}
