import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-asset-test-result-chart',
  templateUrl: './asset-test-result-chart.component.html',
  styleUrls: ['./asset-test-result-chart.component.scss'],
})
export class AssetTestResultChartComponent implements OnInit, OnChanges {

  @Input() assetTestResult;

  public chartLabels: string[] = [];

  public chartData: any = [
    {data: [], label: 'Maturity'},
  ];
  public chartType = 'line';

  public chartOptions = {
    legend: {
      display: true,
      position: 'top',
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: false,
          },
        },
      ],
    },
    responsive: true,
  };

  constructor() {
  }

  ngOnInit() {const radarChartLabels = [];
    const radarChartData = [];

    if (this.assetTestResult) {
      this.assetTestResult
        .categories
        .forEach((category) => {
          category.capabilities.forEach((capability) => {
            radarChartLabels.push(capability.capability_name);
            radarChartData.push(capability.score);
          });
        });
    }
    this.chartLabels = radarChartLabels;
    this.chartData[0].data = radarChartData;
  }

  ngOnChanges() {}


}
