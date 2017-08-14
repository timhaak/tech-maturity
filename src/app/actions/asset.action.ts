import {Action} from '@ngrx/store';
import {InterfaceAsset} from '../interfaces/InterfaceAsset';
import {InterfaceAssetType} from '../interfaces/InterfaceAssetType';


export const ASSET_ADD = '[Asset] ADD';
export const ASSET_TYPE_ADD = '[Asset Type] ADD';


export class AssetAdd implements Action {
  readonly type = ASSET_ADD;

  constructor(public payload: InterfaceAsset) {}
}

export class AssetTypeAdd implements Action {
  readonly type = ASSET_TYPE_ADD;

  constructor(public payload: InterfaceAssetType[]) {}
}

export type Actions =
  | AssetAdd
  | AssetTypeAdd;

