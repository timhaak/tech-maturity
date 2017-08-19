import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import * as assetAction from '../../../actions/asset.action';
import {InterfaceAssetTest} from '../../../interfaces/InterfaceAssetTest';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
import {InterfaceStateAsset} from '../../../interfaces/InterfaceStateAsset';
import {InterfaceStateCategory} from '../../../interfaces/InterfaceStateCategory';
import * as fromRoot from '../../../reducers';

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

  constructor(private store: Store<InterfaceStateApp>) {
    this.assetState$ = this.store.select(fromRoot.selectAssetState).takeUntil(this.stop$);
    this.categoryState$ = this.store.select(fromRoot.selectCatergoryState).takeUntil(this.stop$);
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
    const assetTest: InterfaceAssetTest = {
      asset_id: this.form.asset_id,
      answered_count: 0,
      capabilities: {},
    };
    this.store.dispatch(new assetAction.AssetTestAdd(assetTest));
  }

  ngOnDestroy() {
    this.stop$.next(true);
  }

}
