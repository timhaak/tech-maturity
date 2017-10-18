import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {find} from 'lodash';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {InterfaceAssetTest} from '../../../interfaces/InterfaceAssetTest';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
import {InterfaceStateAsset} from '../../../interfaces/InterfaceStateAsset';
import {InterfaceStateCategory} from '../../../interfaces/InterfaceStateCategory';
import * as fromRoot from '../../../reducers';
import {TestDataService} from '../../../services/test-data.service';

@Component({
  selector: 'app-asset-test-result',
  templateUrl: './asset-test-result.component.html',
  styleUrls: ['./asset-test-result.component.scss'],
})
export class AssetTestResultComponent implements OnInit, OnDestroy {

  private stop$: Subject<boolean> = new Subject();
  public categoryState$: Observable<InterfaceStateCategory>;
  public categoryState: InterfaceStateCategory;
  public assetState$: Observable<InterfaceStateAsset>;
  public assetState: InterfaceStateAsset;

  public asset_test_id: string;
  public assetTest: InterfaceAssetTest;
  public assetTestResult: any;

  constructor(private store: Store<InterfaceStateApp>,
              private route: ActivatedRoute,
              private testDataService: TestDataService) {

    this.categoryState$ = this.store
      .select(fromRoot.selectCategoryState)
      .takeUntil(this.stop$);

    this.assetState$ = this.store
      .select(fromRoot.selectAssetState)
      .takeUntil(this.stop$);

    this.route.params
      .takeUntil(this.stop$)
      .subscribe((params: Params) => {
        this.asset_test_id = params['asset_test_id'];
        this.getData();
      });

    this.assetState$
      .subscribe((assetState: InterfaceStateAsset) => {
        this.assetState = assetState;
        this.getData();
      });

    this.categoryState$
      .subscribe((categoryState: InterfaceStateCategory) => {
        this.categoryState = categoryState;
        this.getData();
      });
  }

  getData() {
    if (this.asset_test_id &&
      this.assetState &&
      this.assetState.asset_tests &&
      this.categoryState &&
      this.categoryState.categories &&
      this.categoryState.category_capability_levels
    ) {
      this.assetTest = find(this.assetState.asset_tests, {id: this.asset_test_id});

      if (this.assetTest) {

        this.assetTestResult = this.testDataService.getTestData(this.assetTest, this.assetState, this.categoryState);
      }
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.stop$.next(true);
  }

}
