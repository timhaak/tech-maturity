import * as assetAction from '../actions/asset.action';
import {InterfaceStateAsset} from '../interfaces/InterfaceStateAsset';

export const initialState: InterfaceStateAsset = {
  assets: [],
  asset_tests: [],
  asset_groups: [],
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
    case assetAction.ASSET_GROUPS_ADD: {
      const asset_groups = action.payload;
      return Object.assign({}, state, {asset_groups});
    }
    default: {
      return state;
    }
  }
}

export const getAssetGroups = (state: InterfaceStateAsset) => state.asset_groups;
export const getAssets = (state: InterfaceStateAsset) => state.assets;
