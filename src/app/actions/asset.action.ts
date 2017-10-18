import {Action} from '@ngrx/store';
import {InterfaceAsset} from '../interfaces/InterfaceAsset';
import {InterfaceAssetTest} from '../interfaces/InterfaceAssetTest';
import {InterfaceAssetGroup} from '../interfaces/InterfaceAssetGroup';


export const ASSET_ADD = '[Asset] ADD';
export const ASSETS_ADD = '[Asset] ADD All';
export const ASSET_TESTS_ADD = '[Asset Test] ADD ALL';
export const ASSET_TEST_ADD = '[Asset Test] ADD';
export const ASSET_TEST_DEL = '[Asset Test] DEL';
export const ASSET_TEST_UPDATE = '[Asset Test] UPDATE';
export const ASSET_TEST_COMPLETE = '[Asset Test] COMPLETE';
export const ASSET_GROUP_ADD = '[Asset Group] ADD';
export const ASSET_GROUP_DEL = '[Asset Group] DEL';
export const ASSET_GROUPS_ADD = '[Asset Group] ADD ALL';
export const ASSET_GROUP_ADD_ASSETS = '[Asset Group] ASSET_GROUP_ADD_ASSETS';
export const ASSET_GROUP_ADD_SUB_GROUPS = '[Asset Group] ASSET_GROUP_ADD_SUB_GROUPS';
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

export class AssetGroupAdd implements Action {
  readonly type = ASSET_GROUP_ADD;

  constructor(public payload: string) {}
}

export class AssetGroupDel implements Action {
  readonly type = ASSET_GROUP_DEL;

  constructor(public payload: InterfaceAssetGroup) {}
}

export class AssetGroupsAdd implements Action {
  readonly type = ASSET_GROUPS_ADD;

  constructor(public payload: string) {}
}

export class AssetGroupAddAssets implements Action {
  readonly type = ASSET_GROUP_ADD_ASSETS;

  constructor(public payload: {
    assetGroup: InterfaceAssetGroup,
    assets: InterfaceAsset[],
  }) {}
}

export class AssetGroupAddSubGroups implements Action {
  readonly type = ASSET_GROUP_ADD_SUB_GROUPS;

  constructor(public payload: {
    assetGroup: InterfaceAssetGroup,
    assetGroups: InterfaceAssetGroup[],
  }) {}
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
  | AssetGroupAdd
  | AssetGroupDel
  | AssetGroupsAdd
  | AssetGroupAddAssets
  | AssetGroupAddSubGroups
  | BackupUpload;

