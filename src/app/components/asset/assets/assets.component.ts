import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {find} from 'lodash';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import * as assetAction from '../../../actions/asset.action';
import {InterfaceAssetTest} from '../../../interfaces/InterfaceAssetTest';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
import {InterfaceStateAsset} from '../../../interfaces/InterfaceStateAsset';
import {InterfaceStateCategory} from '../../../interfaces/InterfaceStateCategory';
import * as fromRoot from '../../../reducers';
import {InterfaceAsset} from '../../../interfaces/InterfaceAsset';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit, OnDestroy {

  private stop$: Subject<boolean> = new Subject();

  assetState$: Observable<InterfaceStateAsset>;
  assetState: InterfaceStateAsset;
  categoryState$: Observable<InterfaceStateCategory>;

  form = {
    asset_id: null,
  };

  assetForm: InterfaceAsset = {
    id: null,
    name: null,
  };

  constructor(private store: Store<InterfaceStateApp>,
              private router: Router) {
    this.assetState$ = this.store.select(fromRoot.selectAssetState).takeUntil(this.stop$);
    this.categoryState$ = this.store.select(fromRoot.selectCategoryState).takeUntil(this.stop$);
    this.assetState$
      .subscribe((assetState: InterfaceStateAsset) => {
        this.assetState = assetState;
        this.getData();
      });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    if (this.form.asset_id === null &&
      this.assetState &&
      this.assetState.assets &&
      this.assetState.assets.length > 0) {
      this.form.asset_id = this.assetState.assets[0].id;
    }
  }

  onSubmitAddAssetTest() {
    const activeAssetTest: InterfaceAssetTest = find(this.assetState.asset_tests, {
      asset_id: this.form.asset_id,
      completed_at: null,
    });

    if (activeAssetTest) {
      this.router.navigate(['/test/' + activeAssetTest.id])
        .catch(e => console.error);
    } else {
      const assetTest: InterfaceAssetTest = {
        asset_id: this.form.asset_id,
        answered_count: 0,
        capabilities: {},
      };
      this.store.dispatch(new assetAction.AssetTestAdd(assetTest));
    }
  }

  deleteTest(test_id: string) {
    this.store.dispatch(new assetAction.AssetTestDelete(test_id));
  }

  onAssetAddSubmit() {
    this.store.dispatch(new assetAction.AssetAdd(this.assetForm));
  }

  ngOnDestroy() {
    this.stop$.next(true);
  }

}
