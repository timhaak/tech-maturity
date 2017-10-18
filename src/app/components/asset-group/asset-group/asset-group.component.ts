import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import * as assetAction from '../../../actions/asset.action';
import {InterfaceAssetGroup} from '../../../interfaces/InterfaceAssetGroup';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
import {InterfaceStateAsset} from '../../../interfaces/InterfaceStateAsset';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-asset-group',
  templateUrl: './asset-group.component.html',
  styleUrls: ['./asset-group.component.scss'],
})
export class AssetGroupComponent implements OnInit, OnDestroy {

  private stop$: Subject<boolean> = new Subject();
  assetState$: Observable<InterfaceStateAsset>;

  form: InterfaceAssetGroup = {
    name: '',
    assets: [],
    sub_groups: [],
  };

  constructor(private store: Store<InterfaceStateApp>) {
    this.assetState$ = this.store.select(fromRoot.selectAssetState)
      .takeUntil(this.stop$);
  }

  ngOnInit() {
  }

  onSubmitAddGroup() {
    this.store.dispatch(new assetAction.AssetGroupAdd(this.form.name));
  }

  deleteAssetGroup(assetGroup: InterfaceAssetGroup) {
    this.store.dispatch(new assetAction.AssetGroupDel(assetGroup));
  }

  ngOnDestroy() {
    this.stop$.next(true);
  }
}
