import {Action} from '@ngrx/store';
import {InterfaceAsset} from '../interfaces/InterfaceAsset';


export const ASSET_ADD = '[Asset] ADD';


export class AssetAdd implements Action {
  readonly type = ASSET_ADD;

  constructor(public payload: InterfaceAsset) {}
}

export type Actions =
  | AssetAdd;

