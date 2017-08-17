import * as assetAction from '../actions/asset.action';
import {InterfaceStateAsset} from '../interfaces/InterfaceStateAsset';

export const initialState: InterfaceStateAsset = {
  asset_types: [],
  assets: [],
  asset_tests: [],
};

export function reducer(state = initialState, action: assetAction.Actions): InterfaceStateAsset {
  switch (action.type) {
    case assetAction.ASSETS_ADD: {
      const assets = action.payload;
      return Object.assign({}, state, {assets});
    }
    case assetAction.ASSET_TESTS_ADD: {
      const asset_tests = action.payload;
      return Object.assign({}, state, {asset_tests});
    }
    case assetAction.ASSET_TYPE_ADD: {
      const asset_types = action.payload;
      return Object.assign({}, state, {asset_types});
    }
    default: {
      return state;
    }
  }
}

export const getAssetTypes = (state: InterfaceStateAsset) => state.asset_types;
export const getAssets = (state: InterfaceStateAsset) => state.assets;
