import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-asset-test-result-polar',
  templateUrl: './asset-test-result-polar.component.html',
  styleUrls: ['./asset-test-result-polar.component.scss'],
})
export class AssetTestResultPolarComponent implements OnInit, OnChanges {

  @Input() assetTestResult;

  public radarChartLabels: string[] = [];

  public radarChartData: any = [
    {data: [], label: 'Value'},
    {data: [], label: 'Minimum'},
    {data: [], label: ''},
  ];
  public radarChartType = 'radar';

  public chartOptions = {
    legend: {
      display: true,
      position: 'top',
    },
  };

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    const radarChartLabels = [];
    const radarChartData = [];
    const radarChartMinData = [];
    const radarChartTestData = [];

    if (this.assetTestResult) {
      this.assetTestResult
        .categories
        .forEach((category) => {
          radarChartLabels.push(category.category_name);
          radarChartData.push(category.total_score_normalised);
          radarChartMinData.push(category.total_expected_score_normalised);
          radarChartTestData.push(0);
        });
    }
    this.radarChartLabels = radarChartLabels;
    this.radarChartData[0].data = radarChartData;
    this.radarChartData[1].data = radarChartMinData;
    this.radarChartData[2].data = radarChartTestData;
  }

}
