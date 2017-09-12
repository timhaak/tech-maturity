import {Action} from '@ngrx/store';
import {InterfaceAsset} from '../interfaces/InterfaceAsset';
import {InterfaceAssetType} from '../interfaces/InterfaceAssetType';
import {InterfaceAssetTest} from '../interfaces/InterfaceAssetTest';


export const ASSET_ADD = '[Asset] ADD';
export const ASSETS_ADD = '[Asset] ADD All';
export const ASSET_TESTS_ADD = '[Asset Test] ADD ALL';
export const ASSET_TEST_ADD = '[Asset Test] ADD';
export const ASSET_TEST_DEL = '[Asset Test] DEL';
export const ASSET_TEST_UPDATE = '[Asset Test] UPDATE';
export const ASSET_TEST_COMPLETE = '[Asset Test] COMPLETE';
export const ASSET_TYPE_ADD = '[Asset Type] ADD';
export const BACKUP_UPLOAD = '[Backup] UPLOAD';


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

export class AssetTestDelete implements Action {
  readonly type = ASSET_TEST_DEL;

  constructor(public payload: string) {}
}

export class AssetTestUpdate implements Action {
  readonly type = ASSET_TEST_UPDATE;

  constructor(public payload: InterfaceAssetTest) {}
}

export class AssetTestComplete implements Action {
  readonly type = ASSET_TEST_COMPLETE;

  constructor(public payload: InterfaceAssetTest) {}
}

export class AssetTypeAdd implements Action {
  readonly type = ASSET_TYPE_ADD;

  constructor(public payload: InterfaceAssetType[]) {}
}

export class BackupUpload implements Action {
  readonly type = BACKUP_UPLOAD;

  constructor(public payload: File) {}
}

export type Actions =
  | AssetAdd
  | AssetsAdd
  | AssetTestsAdd
  | AssetTestAdd
  | AssetTestDelete
  | AssetTestUpdate
  | AssetTestComplete
  | AssetTypeAdd
  | BackupUpload;

