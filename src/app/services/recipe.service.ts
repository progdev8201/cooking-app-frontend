import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecipeDTO } from '../models/recipe-dto';
import { RecipeStringResponse } from '../models/recipe-string-response';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http:HttpClient) { }

  create(recipeDTO:RecipeDTO){
    return this.http.post<RecipeDTO>(`${environment.recipeUrl}/${localStorage.getItem('userId')}`,recipeDTO);
  }

  find(recipeId:string):Observable<RecipeDTO>{
    return this.http.get<RecipeDTO>(`${environment.recipeUrl}/${localStorage.getItem('userId')}/${recipeId}`);
  }

  findAllStrings():Observable<RecipeStringResponse[]>{
    return this.http.get<RecipeStringResponse[]>(`${environment.recipeUrl}/findAllStrings/${localStorage.getItem('userId')}`);
  }

  findAll():Observable<RecipeDTO[]>{
    return this.http.get<RecipeDTO[]>(`${environment.recipeUrl}/${localStorage.getItem('userId')}`);
  }

  update(recipeDTO:RecipeDTO):Observable<RecipeDTO>{
    return this.http.put<RecipeDTO>(`${environment.recipeUrl}/${localStorage.getItem('userId')}`,recipeDTO);
  }

  delete(recipeId: string):Observable<RecipeDTO[]>{
    return this.http.delete<RecipeDTO[]>(`${environment.recipeUrl}/${localStorage.getItem('userId')}/${recipeId}`);
  }
}
