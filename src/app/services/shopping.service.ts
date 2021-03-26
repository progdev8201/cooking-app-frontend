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

  addArticlesToShoppingList(shoppingListArticles:RoutineArticleDTO[]):Observable<RoutineArticleDTO[]>{
    return this.http.put<RoutineArticleDTO[]>(`${environment.shoppingUrl}/add/${localStorage.getItem('userId')}`,shoppingListArticles);
  }

  deleteArticlesToShoppingList(shoppingListArticles:RoutineArticleDTO[]):Observable<RoutineArticleDTO[]>{
    return this.http.put<RoutineArticleDTO[]>(`${environment.shoppingUrl}/delete/${localStorage.getItem('userId')}`,shoppingListArticles);
  }

  findAll():Observable<RoutineArticleDTO[]>{
    return this.http.get<RoutineArticleDTO[]>(`${environment.shoppingUrl}/${localStorage.getItem('userId')}`);
  }

  shop(articlesToShop:RoutineArticleDTO[]){
    return this.http.post(`${environment.shoppingUrl}/shopAll/${localStorage.getItem('userId')}`,articlesToShop);
  }
}
