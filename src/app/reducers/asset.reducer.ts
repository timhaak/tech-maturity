import * as assetAction from '../actions/asset.action';
import {InterfaceStateAsset} from '../interfaces/InterfaceStateAsset';
import {ConstantAssets} from '../constants/ConstantAssets';

export const initialState: InterfaceStateAsset = {
  asset_types: [],
  assets: ConstantAssets,
};

export function reducer(state = initialState, action: assetAction.Actions): InterfaceStateAsset {
  switch (action.type) {
    case assetAction.ASSET_ADD: {
      const assets = [
        ...state.assets,
        action.payload
      ];
      return Object.assign({}, state, {assets});
    }
    case assetAction.ASSET_TYPE_ADD: {
      const asset_types =  action.payload;
      return Object.assign({}, state, {asset_types});
    }
    default: {
      return state;
    }
  }
}

export const getAssetTypes = (state: InterfaceStateAsset) => state.asset_types;
export const getAssets = (state: InterfaceStateAsset) => state.assets;
