import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {difference, find} from 'lodash';
import {DragulaService} from 'ng2-dragula';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import * as assetAction from '../../../actions/asset.action';
import {InterfaceAsset} from '../../../interfaces/InterfaceAsset';
import {InterfaceAssetGroup} from '../../../interfaces/InterfaceAssetGroup';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
import {InterfaceStateAsset} from '../../../interfaces/InterfaceStateAsset';
import * as fromRoot from '../../../reducers';
import {TestDataService} from '../../../services/test-data.service';

@Component({
  selector: 'app-asset-group-edit',
  templateUrl: './asset-group-edit.component.html',
  styleUrls: ['./asset-group-edit.component.scss'],
})
export class AssetGroupEditComponent implements OnInit, OnDestroy {

  asset_group_id: string;

  private stop$: Subject<boolean> = new Subject();
  assetState$: Observable<InterfaceStateAsset>;
  assetState: InterfaceStateAsset;

  assetGroup: InterfaceAssetGroup;

  assetGroupAssets: InterfaceAsset[] = [];
  assetsAvailable: InterfaceAsset[] = [];

  allAssets: InterfaceAsset[] = [];

  assetGroupSubGroups: InterfaceAssetGroup[] = [];
  assetsGroupsAvailable: InterfaceAssetGroup[] = [];

  constructor(private store: Store<InterfaceStateApp>,
              private route: ActivatedRoute,
              private dragulaService: DragulaService,
              private testDataService: TestDataService) {

    // dragulaService.setOptions('assetGroupAssetBag', {
    //   revertOnSpill: true,
    // });

    this.route.params
      .takeUntil(this.stop$)
      .subscribe((params: Params) => {
        this.asset_group_id = params['asset_group_id'];
        this.getData();
      });

    this.assetState$ = this.store.select(fromRoot.selectAssetState)
      .takeUntil(this.stop$);

    this.assetState$
      .subscribe((assetState: InterfaceStateAsset) => {
        this.assetState = assetState;
        this.getData();
      });

    dragulaService
      .drop
      .takeUntil(this.stop$)
      .subscribe(this.assetsChanged.bind(this));

    dragulaService
      .drop
      .takeUntil(this.stop$)
      .subscribe(this.assetsGroupChanged.bind(this));
  }

  getData() {
    const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

    if (
      this.assetState &&
      this.assetState.assets &&
      this.assetState.assets.length > 0 &&
      this.assetState.asset_groups &&
      this.asset_group_id
    ) {
      this.assetGroup = find(this.assetState.asset_groups, {id: this.asset_group_id});

      if (this.assetGroup) {
        this.assetGroupAssets = this.assetGroup.assets
          .map(
            (asset_id): InterfaceAsset => find(this.assetState.assets, {id: asset_id}),
          )
          .sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            return collator.compare(nameA, nameB);
          });
      } else {
        this.assetGroupAssets = [];
      }

      this.assetsAvailable = difference(this.assetState.assets, this.assetGroupAssets)
        .sort(function (a, b) {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          return collator.compare(nameA, nameB);
        });

      if (this.assetGroup) {
        this.assetGroupSubGroups = this.assetGroup.sub_groups
          .map(
            (asset_group_id): InterfaceAssetGroup => find(this.assetState.asset_groups, {id: asset_group_id}),
          )
          .sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            return collator.compare(nameA, nameB);
          });
      } else {
        this.assetGroupSubGroups = [];
      }

      this.assetsGroupsAvailable = difference(this.assetState.asset_groups, this.assetGroupSubGroups)
        .filter((asset_group) => {
          return asset_group.id !== this.asset_group_id;
        })
        .sort( (a, b) => {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          return collator.compare(nameA, nameB);
        });

      this.allAssets = this.testDataService.getAssetGroupAssets(this.assetGroup, this.assetState);
    }
  }

  assetsChanged() {
    this.store.dispatch(new assetAction.AssetGroupAddAssets({
      assetGroup: this.assetGroup,
      assets: this.assetGroupAssets,
    }));
  }

  assetsGroupChanged() {
    this.store.dispatch(new assetAction.AssetGroupAddSubGroups({
      assetGroup: this.assetGroup,
      assetGroups: this.assetGroupSubGroups,
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.stop$.next(true);
  }

}
