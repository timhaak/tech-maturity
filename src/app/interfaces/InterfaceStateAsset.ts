import {InterfaceAsset} from './InterfaceAsset';
import {InterfaceAssetTest} from './InterfaceAssetTest';
import {InterfaceAssetGroup} from './InterfaceAssetGroup';

export interface InterfaceStateAsset {
  assets: InterfaceAsset[];
  asset_tests: InterfaceAssetTest[];
  asset_groups: InterfaceAssetGroup[];
}
