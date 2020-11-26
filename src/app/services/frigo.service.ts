import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FridgeDTO } from '../models/fridge-dto';
import { RecipeDTO } from '../models/recipe-dto';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {

  constructor(private http:HttpClient) { }

  find():Observable<FridgeDTO>{
    return this.http.get<FridgeDTO>(`${environment.fridgeUrl}/${localStorage.getItem('userId')}`);
  }

  findAllCookable():Observable<RecipeDTO[]>{
    return this.http.get<RecipeDTO[]>(`${environment.fridgeUrl}/findAll/${localStorage.getItem('userId')}`);
  }

  updateFridge(fridgeDTO:FridgeDTO):Observable<FridgeDTO>{
    return this.http.put<FridgeDTO>(`${environment.fridgeUrl}/${localStorage.getItem('userId')}`,fridgeDTO);
  }

}
