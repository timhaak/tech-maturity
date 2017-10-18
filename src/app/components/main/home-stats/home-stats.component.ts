import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {find} from 'lodash';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {InterfaceAsset} from '../../../interfaces/InterfaceAsset';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
import {InterfaceStateAsset} from '../../../interfaces/InterfaceStateAsset';
import {InterfaceStateCategory} from '../../../interfaces/InterfaceStateCategory';
import * as fromRoot from '../../../reducers';
import {TestDataService} from '../../../services/test-data.service';

@Component({
  selector: 'app-home-stats',
  templateUrl: './home-stats.component.html',
  styleUrls: ['./home-stats.component.scss'],
})
export class HomeStatsComponent implements OnInit, OnDestroy {


  private stop$: Subject<boolean> = new Subject();

  assetState$: Observable<InterfaceStateAsset>;
  assetState: InterfaceStateAsset;

  categoryState$: Observable<InterfaceStateCategory>;
  categoryState: InterfaceStateCategory;

  groupAssetData;
  displayedAssets: InterfaceAsset[];

  assetGroupsDropdown = [];
  assetGroupsDropdownId = 'All';

  constructor(private store: Store<InterfaceStateApp>,
              private router: Router,
              private testDataService: TestDataService) {

    this.assetState$ = this.store.select(fromRoot.selectAssetState)
      .takeUntil(this.stop$);

    this.assetState$
      .subscribe((assetState: InterfaceStateAsset) => {
        this.assetState = assetState;
        this.getData();
      });

    this.categoryState$ = this.store.select(fromRoot.selectCategoryState)
      .takeUntil(this.stop$);

    this.categoryState$
      .subscribe((categorySate: InterfaceStateCategory) => {
        this.categoryState = categorySate;
        this.getData();
      });
  }

  getData() {
    if (
      this.assetState &&
      this.categoryState &&
      this.assetState.assets) {

      if (this.assetGroupsDropdownId === 'All') {
        this.displayedAssets = this.assetState.assets;
      } else {
        const assetGroup = find(this.assetState.asset_groups, {id: this.assetGroupsDropdownId});
        this.displayedAssets = this.testDataService.getAssetGroupAssets(assetGroup, this.assetState);
      }
      this.groupAssetData = this.testDataService.groupAssetData(
        this.displayedAssets, this.assetState, this.categoryState,
      );

      const assetGroupsDropdown = [];

      assetGroupsDropdown.push(
        {
          id: 'All',
          name: 'All',
        },
      );

      this.assetState.asset_groups
        .forEach((assetGroup) => {
          assetGroupsDropdown.push({
            id: assetGroup.id,
            name: assetGroup.name,
          });
        });

      this.assetGroupsDropdown = assetGroupsDropdown;
    }
  }

  ngOnInit() {
  }

  gotoAsset() {
    this.router.navigate(['/asset']);
  }

  ngOnDestroy() {
    this.stop$.next(true);
  }

}
