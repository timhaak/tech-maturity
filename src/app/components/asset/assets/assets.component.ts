import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
import {InterfaceStateAsset} from '../../../interfaces/InterfaceStateAsset';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {

  assetState$: Observable<InterfaceStateAsset>;

  constructor(private store: Store<InterfaceStateApp>) {
    this.assetState$ = this.store.select(fromRoot.selectAssetState);
  }

  ngOnInit() {
  }

}
