import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllStatisticsResponse } from '../models/all-statistics-response';
import { CookingAmountPerMonthResponse } from '../models/cooking-amount-per-month-response';
import { MoneySpentPerMonthResponse } from '../models/money-spent-per-month-response';
import { RecipeCookTimePerMonthResponse } from '../models/recipe-cook-time-per-month-response';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http:HttpClient) { }

  findMoneySpentPerMonth(year:number):Observable<MoneySpentPerMonthResponse[]>{
    return this.http.get<MoneySpentPerMonthResponse[]>(`${environment.statisticUrl}/moneySpentPerMonth/${localStorage.getItem('userId')}/${year}`);
  }
  
  findAmountOfTimeARecipeIsCookedPerMonth(recipeId: number, year: number): Observable<RecipeCookTimePerMonthResponse[]>{
    return this.http.get<RecipeCookTimePerMonthResponse[]>(`${environment.statisticUrl}/timeRecipeCookedPerMonth/${localStorage.getItem('userId')}/${recipeId}/${year}`);
  }
  
  findAmountOfTimeUserCookPerMonth(year: number):Observable<CookingAmountPerMonthResponse[]>{
    return this.http.get<CookingAmountPerMonthResponse[]>(`${environment.statisticUrl}/timeUserCookPerMonth/${localStorage.getItem('userId')}/${year}`);
  }
  
  findAllStatistics(recipeId: number, year: number):Observable<AllStatisticsResponse>{
    return this.http.get<AllStatisticsResponse>(`${environment.statisticUrl}/allStats/${localStorage.getItem('userId')}/${recipeId}/${year}`);
  }
}
