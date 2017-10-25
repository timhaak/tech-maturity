import {Injectable, OnDestroy} from '@angular/core';
import {Headers, Http, RequestOptionsArgs, Response} from '@angular/http';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ASSET_GROUP_ADD, ASSET_GROUPS_ADD, ASSET_TESTS_ADD, ASSETS_ADD} from '../actions/asset.action';
import {
  ALL_DATA_ADD,
  CATEGORY_ADD,
  CATEGORY_CAPABILITY_ADD,
  CATEGORY_CAPABILITY_LEVEL_ADD,
} from '../actions/category.action';
import {ConstantUrls} from '../constants/ConstantUrls';
import {InterfaceAllData} from '../interfaces/InterfaceAllData';
import {InterfaceAsset} from '../interfaces/InterfaceAsset';
import {InterfaceCategory} from '../interfaces/InterfaceCategory';
import {InterfaceCategoryCapabilityLevel} from '../interfaces/InterfaceCategoryCapabilityLevel';
import {InterfaceStateApp} from '../interfaces/InterfaceStateApp';
import {InterfaceAssetTest} from '../interfaces/InterfaceAssetTest';
import {InterfaceAssetGroup} from '../interfaces/InterfaceAssetGroup';

@Injectable()
export class DataService implements OnDestroy {


  private stop$: Subject<boolean> = new Subject();

  constructor(private http: Http,
              private store: Store<InterfaceStateApp>) {
  }

  getHTTPHeaders(acceptMimeType = 'application/json'): Headers {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': acceptMimeType,
    });

    return headers;
  }

  getAll() {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    return this.http
      .get(ConstantUrls.allData, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$)
      .subscribe((allData: InterfaceAllData) => {
        this.store.dispatch({
          type: ALL_DATA_ADD,
          payload: allData,
        });
      });
  }

  getCategory() {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    return this.http
      .get(ConstantUrls.category, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$)
      .subscribe((categories: InterfaceCategory[]) => {
        this.store.dispatch({
          type: CATEGORY_ADD,
          payload: categories,
        });
      });
  }

  getCategoryCapability() {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    return this.http
      .get(ConstantUrls.category_capability, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$)
      .subscribe((categoryCapability: InterfaceCategory[]) => {
        this.store.dispatch({
          type: CATEGORY_CAPABILITY_ADD,
          payload: categoryCapability,
        });
      });
  }

  getCategoryCapabilityLevel() {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    return this.http
      .get(ConstantUrls.category_capability_level, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$)
      .subscribe((categoryCapabilityLevel: InterfaceCategoryCapabilityLevel[]) => {
        this.store.dispatch({
          type: CATEGORY_CAPABILITY_LEVEL_ADD,
          payload: categoryCapabilityLevel,
        });
      });
  }

  addAsset(asset: InterfaceAsset) {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    return this.http
      .post(ConstantUrls.asset, asset, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$);
  }

  getAssets() {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    return this.http
      .get(ConstantUrls.asset, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$)
      .subscribe((assets: InterfaceAsset[]) => {
        this.store.dispatch({
          type: ASSETS_ADD,
          payload: assets,
        });
      });
  }

  addAssetTest(asset_test: InterfaceAssetTest) {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    return this.http
      .post(ConstantUrls.asset_test, asset_test, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$);
  }

  updateAssetTest(asset_test: InterfaceAssetTest) {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    asset_test.answered_count = Object.keys(asset_test.capabilities).length;

    return this.http
      .put(ConstantUrls.asset_test, asset_test, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$);
  }

  deleteAssetTest(asset_test_id: string) {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };


    return this.http
      .delete(`${ConstantUrls.asset_test}/${asset_test_id}`, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$);
  }

  getAssetTests() {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    return this.http
      .get(ConstantUrls.asset_test, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$)
      .subscribe((asset_tests: InterfaceAssetTest[]) => {
        this.store.dispatch({
          type: ASSET_TESTS_ADD,
          payload: asset_tests,
        });
      });
  }

  getAssetGroups() {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    return this.http
      .get(ConstantUrls.asset_group, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$)
      .subscribe((asset_groups: InterfaceAssetGroup[]) => {
        this.store.dispatch({
          type: ASSET_GROUPS_ADD,
          payload: asset_groups,
        });
      });
  }

  addAssetGroup(asset_group: InterfaceAssetGroup) {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    return this.http
      .post(ConstantUrls.asset_group, asset_group, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$);
  }

  addAssetGroupAssets(assetGroup: InterfaceAssetGroup, assets: InterfaceAsset[]) {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    const assetIds = assets.map(asset => asset.id);

    return this.http
      .post(`${ConstantUrls.asset_group}/add_assets`, {
        asset_group_id: assetGroup.id,
        asset_ids: assetIds,
      }, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$);
  }

  addAssetGroupSubGroups(asset_group: InterfaceAssetGroup, sub_asset_groups: InterfaceAssetGroup[]) {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    const assetGroupSubGroupIds = sub_asset_groups.map(sub_asset_group => sub_asset_group.id);

    return this.http
      .post(`${ConstantUrls.asset_group}/add_asset_groups`, {
        asset_group_id: asset_group.id,
        asset_group_sub_group_ids: assetGroupSubGroupIds,
      }, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$);
  }

  delAssetGroup(assetGroup: InterfaceAssetGroup) {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    return this.http
      .delete(`${ConstantUrls.asset_group}/${assetGroup.id}`, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$);
  }

  postBackupFile(file: File) {
    const headers = new Headers();

    const requestOptions: RequestOptionsArgs = {
      headers: headers,
    };

    const formData: FormData = new FormData();
    formData.append('tmConfig', file, file.name);

    return this.http
      .post(ConstantUrls.config_upload, formData, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$);
  }

  initialise() {
    this.getCategory();
    this.getCategoryCapability();
    this.getCategoryCapabilityLevel();
    this.getAssets();
    this.getAssetTests();
    this.getAssetGroups();
  }

  private handleError(error: any) {

    // let errorJson;
    // if (error.json) {
    //   errorJson = error.json();
    // }
    // if (error &&
    //   error.status &&
    //   (error.status === 401 || error.status === 500)
    // ) {
    //   this.authService.logOut();
    // } else {
    //   if (errorJson.message) {
    //     this.routingService.addAlert(errorJson.message, ALERT_TYPE_DANGER, 'Error:');
    //   } else {
    //     this.routingService.addAlert('Something went wrong', ALERT_TYPE_DANGER, 'Error:');
    //     // console.error(error);
    //   }
    // }
    return Observable.throw(error);
  }


  ngOnDestroy() {
    this.stop$.next(true);
  }

}
