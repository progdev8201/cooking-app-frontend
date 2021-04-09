import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() data: number[];
  @Input() label: string;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['January', 'February', 'Mars', 'April', 'May', 'June', 'July', 'August', 'Septembre', 'Octobre', 'November', 'December'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Best Fruits' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.barChartData[0].data = this.data;
    this.barChartData[0].label = this.label;
  }
}
