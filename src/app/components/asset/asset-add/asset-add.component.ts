import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {UUID} from 'angular2-uuid';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import * as assetAction from '../../../actions/asset.action';
import {InterfaceAsset} from '../../../interfaces/InterfaceAsset';
import {InterfaceAssetType} from '../../../interfaces/InterfaceAssetType';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
import {InterfaceStateAsset} from '../../../interfaces/InterfaceStateAsset';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-asset-add',
  templateUrl: './asset-add.component.html',
  styleUrls: ['./asset-add.component.scss'],
})
export class AssetAddComponent implements OnInit, OnDestroy {

  private stop$: Subject<boolean> = new Subject();

  form: InterfaceAsset = {
    id: null,
    asset_type_id: null,
    name: null,
  };

  assetTypes$: Observable<InterfaceAssetType[]>;
  assetState$: Observable<InterfaceStateAsset>;

  constructor(private store: Store<InterfaceStateApp>) {
    this.assetTypes$ = this.store
      .select(fromRoot.getAssetTypes)
      .takeUntil(this.stop$);

    this.assetState$ = this.store
      .select(fromRoot.selectAssetState)
      .takeUntil(this.stop$);
  }

  ngOnInit() {
    this.assetState$
      .subscribe((stateAsset: InterfaceStateAsset) => {
        if (!this.form.asset_type_id && stateAsset.asset_types && stateAsset.asset_types.length > 0) {
          this.form.asset_type_id = stateAsset.asset_types[0].id;
        }
      });
  }

  onSubmit() {
    this.form.id = UUID.UUID();
    this.store.dispatch(new assetAction.AssetAdd(this.form));
  }

  ngOnDestroy() {
    this.stop$.next(true);
  }

}
