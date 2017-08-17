import {InterfaceAsset} from './InterfaceAsset';
import {InterfaceAssetType} from './InterfaceAssetType';
import {InterfaceAssetTest} from './InterfaceAssetTest';

export interface InterfaceStateAsset {
  asset_types: InterfaceAssetType[];
  assets: InterfaceAsset[];
  asset_tests: InterfaceAssetTest[];
}
