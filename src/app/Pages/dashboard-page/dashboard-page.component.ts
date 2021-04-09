import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  averageMoneySpentPerMonth : number;
  moneySpentThisYear: number;
  averageTimeCookPerMonth: number;
  moneySpentPerMonth: number[] = [];
  timesCookedPerMonth: number[] = [];
  timesRecipeIsCookedPerMonth: number[] = [];

  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.initStats();
  }

  initStats(){
    this.statisticService.findAllStatistics(null,new Date().getFullYear()).subscribe(data =>{
      // non-array variables
      this.averageMoneySpentPerMonth = data.averageMoneySpentPerMonth;
      this.moneySpentThisYear = data.moneySpentThisYear;
      this.averageTimeCookPerMonth = data.averageTimeCookPerMonth;

      // array variables
      this.moneySpentPerMonth = data.moneySpentPerMonthResponses.map(item => item.amount);
      this.timesCookedPerMonth = data.cookingAmountPerMonthResponses.map(item => item.amount);
    })
  }

}
