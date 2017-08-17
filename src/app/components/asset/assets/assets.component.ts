import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as assetAction from '../../../actions/asset.action';
import {InterfaceAssetTest} from '../../../interfaces/InterfaceAssetTest';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
import {InterfaceStateAsset} from '../../../interfaces/InterfaceStateAsset';
import * as fromRoot from '../../../reducers';
import {InterfaceStateCategory} from '../../../interfaces/InterfaceStateCategory';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {

  assetState$: Observable<InterfaceStateAsset>;
  categoryState$: Observable<InterfaceStateCategory>;

  constructor(private store: Store<InterfaceStateApp>) {
    this.assetState$ = this.store.select(fromRoot.selectAssetState);
    this.categoryState$ = this.store.select(fromRoot.selectCatergoryState);
  }

  ngOnInit() {
  }

  addAssetTest(asset_id: string) {
    const assetTest: InterfaceAssetTest = {
      asset_id,
      answered_count: 0,
      capabilities: {},
    };
    this.store.dispatch(new assetAction.AssetTestAdd(assetTest));
  }

}
