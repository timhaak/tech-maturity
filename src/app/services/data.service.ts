import {Injectable, OnDestroy} from '@angular/core';
import {Headers, Http, RequestOptionsArgs, Response} from '@angular/http';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ASSET_TESTS_ADD, ASSET_TYPE_ADD, ASSETS_ADD} from '../actions/asset.action';
import {
  ALL_DATA_ADD,
  CATEGORY_ADD,
  CATEGORY_CAPABILITY_ADD,
  CATEGORY_CAPABILITY_LEVEL_ADD,
} from '../actions/category.action';
import {ConstantUrls} from '../constants/ConstantUrls';
import {InterfaceAllData} from '../interfaces/InterfaceAllData';
import {InterfaceAsset} from '../interfaces/InterfaceAsset';
import {InterfaceAssetType} from '../interfaces/InterfaceAssetType';
import {InterfaceCategory} from '../interfaces/InterfaceCategory';
import {InterfaceCategoryCapabilityLevel} from '../interfaces/InterfaceCategoryCapabilityLevel';
import {InterfaceStateApp} from '../interfaces/InterfaceStateApp';
import {InterfaceAssetTest} from '../interfaces/InterfaceAssetTest';

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

  getAssetType() {
    const requestOptions: RequestOptionsArgs = {
      headers: this.getHTTPHeaders(),
    };

    return this.http
      .get(ConstantUrls.asset_type, requestOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError.bind(this))
      .takeUntil(this.stop$)
      .subscribe((assetTypes: InterfaceAssetType[]) => {
        this.store.dispatch({
          type: ASSET_TYPE_ADD,
          payload: assetTypes,
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

  initialise() {
    this.getAssetType();
    this.getCategory();
    this.getCategoryCapability();
    this.getCategoryCapabilityLevel();
    this.getAssets();
    this.getAssetTests();
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
