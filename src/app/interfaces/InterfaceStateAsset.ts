import {InterfaceAsset} from './InterfaceAsset';
import {InterfaceAssetTypes} from './InterfaceAssetTypes';

export interface InterfaceStateAsset {
  asset_types: InterfaceAssetTypes[];
  assets: InterfaceAsset[];
}
