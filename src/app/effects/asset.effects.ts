import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';
import * as AssetAction from '../actions/asset.action';
import {AssetAdd, AssetTestAdd} from '../actions/asset.action';
import {InterfaceAsset} from '../interfaces/InterfaceAsset';
import {InterfaceAssetTest} from '../interfaces/InterfaceAssetTest';
import {InterfaceStateApp} from '../interfaces/InterfaceStateApp';
import {DataService} from '../services/data.service';

@Injectable()
export class AssetEffects {
  @Effect({dispatch: false})
  addAsset$ = this.actions$
    .ofType(AssetAction.ASSET_ADD)
    .withLatestFrom(this.store, (action: AssetAdd, storeState: InterfaceStateApp) => {
      const asset: InterfaceAsset = action.payload;
      this.dataService.addAsset(asset)
        .subscribe((newAsset: InterfaceAsset) => {
          this.dataService.getAssets();
        });
    })
    .do(() => {
      this.router.navigate(['/asset']);
    });

  @Effect({dispatch: false})
  addAssetTest$ = this.actions$
    .ofType(AssetAction.ASSET_TEST_ADD)
    .withLatestFrom(this.store, (action: AssetTestAdd, storeState: InterfaceStateApp) => {
      this.dataService.addAssetTest(action.payload)
        .subscribe((newAssetTest: InterfaceAssetTest) => {
          console.log(newAssetTest);
          this.dataService.getAssetTests();
          this.router
            .navigate(['/test/' + newAssetTest.id]);
        });
    })
    .do(() => {
    });

  @Effect({dispatch: false})
  updateAssetTest$ = this.actions$
    .ofType(AssetAction.ASSET_TEST_UPDATE)
    .withLatestFrom(this.store, (action: AssetTestAdd, storeState: InterfaceStateApp) => {
      this.dataService.updateAssetTest(action.payload)
        .subscribe((updatedAssetTest: InterfaceAssetTest) => {
          this.dataService.getAssetTests();
        });
    })
    .do(() => {
    });

  constructor(private actions$: Actions,
              private router: Router,
              private store: Store<InterfaceStateApp>,
              private dataService: DataService) {
  }
}
