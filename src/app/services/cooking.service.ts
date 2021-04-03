import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecipeToCookDTO } from '../models/recipe-to-cook-dto';
import { RecipeDTO } from '../models/recipe-dto';

@Injectable({
  providedIn: 'root'
})
export class CookingService {

  constructor(private http:HttpClient) { }

  findAll():Observable<RecipeToCookDTO[]>{
    return this.http.get<RecipeToCookDTO[]>(`${environment.cookingUrl}/${localStorage.getItem}`)
  }

  cookRecipe(recipeToCookId:string){
    return this.http.get(`${environment.cookingUrl}/${localStorage.getItem}/${recipeToCookId}`)
  }

  addRecipesToList(recipesToCook:RecipeDTO[],cookDate:Date){
    return this.http.post(`${environment.cookingUrl}/${localStorage.getItem('userId')}/${cookDate}`,recipesToCook);
  }

  updateCookDay(cookDate:Date,recipeToCookId:string){
    return this.http.put(`${environment.cookingUrl}/${localStorage.getItem('userId')}/${cookDate}/${recipeToCookId}`,{});
  }

  deleteRecipes(recipesToDelete:string[]){
    return this.http.post(`${environment.cookingUrl}/${localStorage.getItem('userId')}`,recipesToDelete);
  }
}
