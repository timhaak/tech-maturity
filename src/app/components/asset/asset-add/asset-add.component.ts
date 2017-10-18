import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import * as assetAction from '../../../actions/asset.action';
import {InterfaceAsset} from '../../../interfaces/InterfaceAsset';
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
    name: null,
  };

  assetState$: Observable<InterfaceStateAsset>;

  constructor(private store: Store<InterfaceStateApp>) {
    this.assetState$ = this.store
      .select(fromRoot.selectAssetState)
      .takeUntil(this.stop$);
  }

  ngOnInit() {

  }

  onSubmit() {
    this.store.dispatch(new assetAction.AssetAdd(this.form));
  }

  ngOnDestroy() {
    this.stop$.next(true);
  }

}
