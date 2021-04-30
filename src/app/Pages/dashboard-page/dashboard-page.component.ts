import { Component, OnInit } from '@angular/core';
import { RecipeStringResponse } from 'src/app/models/recipe-string-response';
import { RecipeService } from 'src/app/services/recipe.service';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  recipeStringResponses: RecipeStringResponse[];
  recipeId:string;
  averageMoneySpentPerMonth : number;
  moneySpentThisYear: number;
  averageTimeCookPerMonth: number;
  moneySpentPerMonth: number[] = [];
  timesCookedPerMonth: number[] = [];
  timesRecipeIsCookedPerMonth: number[] = [];
  year: number = new Date().getFullYear();

  constructor(private statisticService: StatisticService,private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.initStats();
    this.initRecipeStringResponses();
  }

  initStats(){
    this.statisticService.findAllStatistics(null,new Date().getFullYear()).subscribe(data =>{
      // non-array variables
      this.averageMoneySpentPerMonth = data.averageMoneySpentPerMonth;
      this.moneySpentThisYear = data.moneySpentThisYear;
      this.averageTimeCookPerMonth = data.averageTimeCookPerMonth;

      // array variables
      
      this.moneySpentPerMonth = data.moneySpentPerMonthResponses.map(item => parseInt(item.amount.toFixed(2)));
      this.timesCookedPerMonth = data.cookingAmountPerMonthResponses.map(item => parseInt(item.amount.toFixed(2)));
    })
  }

  initRecipeStringResponses(){
    this.recipeService.findAllStrings().subscribe(strings =>{
      this.recipeStringResponses = strings;
    });
  }

  onFetchRecipeStats(){
    if (this.recipeId) {
      this.statisticService.findAmountOfTimeARecipeIsCookedPerMonth(this.recipeId,this.year).subscribe(times =>{
        this.timesRecipeIsCookedPerMonth = times.map(item => parseInt(item.amount.toFixed(2)));
      });
    }
    
  }

}
