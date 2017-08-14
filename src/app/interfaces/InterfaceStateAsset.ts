import {InterfaceAsset} from './InterfaceAsset';
import {InterfaceAssetType} from './InterfaceAssetType';

export interface InterfaceStateAsset {
  asset_types: InterfaceAssetType[];
  assets: InterfaceAsset[];
}
