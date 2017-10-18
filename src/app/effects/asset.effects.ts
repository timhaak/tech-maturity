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
import {
  AssetAdd,
  AssetGroupAdd, AssetGroupAddSubGroups,
  AssetGroupAddAssets,
  AssetGroupDel,
  AssetTestAdd,
  AssetTestDelete,
  BackupUpload,
} from '../actions/asset.action';
import {InterfaceAsset} from '../interfaces/InterfaceAsset';
import {InterfaceAssetGroup} from '../interfaces/InterfaceAssetGroup';
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

  @Effect({dispatch: false})
  deleteAssetTest$ = this.actions$
    .ofType(AssetAction.ASSET_TEST_DEL)
    .withLatestFrom(this.store, (action: AssetTestDelete, storeState: InterfaceStateApp) => {
      this.dataService.deleteAssetTest(action.payload)
        .subscribe((updatedAssetTest: InterfaceAssetTest) => {
          this.dataService.getAssetTests();
        });
    })
    .do(() => {
    });

  @Effect({dispatch: false})
  completeAssetTest$ = this.actions$
    .ofType(AssetAction.ASSET_TEST_COMPLETE)
    .withLatestFrom(this.store, (action: AssetTestAdd, storeState: InterfaceStateApp) => {
      const assetTest = action.payload;
      assetTest.completed_at = new Date();
      this.dataService.updateAssetTest(assetTest)
        .subscribe((updatedAssetTest: InterfaceAssetTest) => {
          this.dataService.getAssetTests();
          this.router
            .navigate(['/asset']);
        });
    })
    .do(() => {
    });

  @Effect({dispatch: false})
  uploadBackup = this.actions$
    .ofType(AssetAction.BACKUP_UPLOAD)
    .withLatestFrom(this.store, (action: BackupUpload, storeState: InterfaceStateApp) => {
      this.dataService.postBackupFile(action.payload)
        .subscribe((res: any) => {
          this.dataService.initialise();
          this.router
            .navigate(['/']);
        });
    })
    .do(() => {
    });

  @Effect({dispatch: false})
  addAssetGroup = this.actions$
    .ofType(AssetAction.ASSET_GROUP_ADD)
    .withLatestFrom(this.store, (action: AssetGroupAdd, storeState: InterfaceStateApp) => {

      const newAssetGroup: InterfaceAssetGroup = {
        name: action.payload,
        assets: [],
        sub_groups: [],
      };

      this.dataService.addAssetGroup(newAssetGroup)
        .subscribe((res: any) => {
          this.dataService.getAssetGroups();
          this.router
            .navigate(['/asset_group']);
        });
    })
    .do(() => {
    });

  @Effect({dispatch: false})
  delAssetGroup = this.actions$
    .ofType(AssetAction.ASSET_GROUP_DEL)
    .withLatestFrom(this.store, (action: AssetGroupDel, storeState: InterfaceStateApp) => {

      this.dataService.delAssetGroup(action.payload)
        .subscribe((res: any) => {
          this.dataService.getAssetGroups();
          this.router
            .navigate(['/asset_group']);
        });
    })
    .do(() => {
    });

  @Effect({dispatch: false})
  addAssetGroupAssets = this.actions$
    .ofType(AssetAction.ASSET_GROUP_ADD_ASSETS)
    .withLatestFrom(this.store, (action: AssetGroupAddAssets, storeState: InterfaceStateApp) => {

      this.dataService.addAssetGroupAssets(action.payload.assetGroup, action.payload.assets)
        .subscribe((res: any) => {
          this.dataService.getAssetGroups();
        });
    })
    .do(() => {
    });

  @Effect({dispatch: false})
  addAssetGroupSubGroups = this.actions$
    .ofType(AssetAction.ASSET_GROUP_ADD_SUB_GROUPS)
    .withLatestFrom(this.store, (action: AssetGroupAddSubGroups, storeState: InterfaceStateApp) => {

      this.dataService.addAssetGroupSubGroups(action.payload.assetGroup, action.payload.assetGroups)
        .subscribe((res: any) => {
          this.dataService.getAssetGroups();
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
