import {Action} from '@ngrx/store';
import {InterfaceAsset} from '../interfaces/InterfaceAsset';
import {InterfaceAssetType} from '../interfaces/InterfaceAssetType';
import {InterfaceAssetTest} from '../interfaces/InterfaceAssetTest';


export const ASSET_ADD = '[Asset] ADD';
export const ASSETS_ADD = '[Asset] ADD All';
export const ASSET_TESTS_ADD = '[Asset Test] ADD ALL';
export const ASSET_TEST_ADD = '[Asset Test] ADD';
export const ASSET_TEST_UPDATE = '[Asset Test] UPDATE';
export const ASSET_TYPE_ADD = '[Asset Type] ADD';


export class AssetAdd implements Action {
  readonly type = ASSET_ADD;

  constructor(public payload: InterfaceAsset) {}
}

export class AssetsAdd implements Action {
  readonly type = ASSETS_ADD;

  constructor(public payload: InterfaceAsset[]) {}
}

export class AssetTestsAdd implements Action {
  readonly type = ASSET_TESTS_ADD;

  constructor(public payload: InterfaceAssetTest[]) {}
}

export class AssetTestAdd implements Action {
  readonly type = ASSET_TEST_ADD;

  constructor(public payload: InterfaceAssetTest) {}
}

export class AssetTestUpdate implements Action {
  readonly type = ASSET_TEST_UPDATE;

  constructor(public payload: InterfaceAssetTest) {}
}

export class AssetTypeAdd implements Action {
  readonly type = ASSET_TYPE_ADD;

  constructor(public payload: InterfaceAssetType[]) {}
}

export type Actions =
  | AssetAdd
  | AssetsAdd
  | AssetTestsAdd
  | AssetTestAdd
  | AssetTestUpdate
  | AssetTypeAdd;

