import {InterfaceStateAuth} from './InterfaceStateAuth';
import {InterfaceStateCategory} from './InterfaceStateCategory';
import {InterfaceStateAsset} from './InterfaceStateAsset';

export interface InterfaceStateApp {
  auth: InterfaceStateAuth;
  category: InterfaceStateCategory;
  asset: InterfaceStateAsset;
}
