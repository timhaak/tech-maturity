import * as assetAction from '../actions/asset.action';
import {ConstantAssetTypes} from '../constants/ConstantAssetTypes';
import {InterfaceStateAsset} from '../interfaces/InterfaceStateAsset';
import {ConstantAssets} from '../constants/ConstantAssets';

export const initialState: InterfaceStateAsset = {
  asset_types: ConstantAssetTypes,
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
    default: {
      return state;
    }
  }
}

export const getAssetTypes = (state: InterfaceStateAsset) => state.asset_types;
export const getAssets = (state: InterfaceStateAsset) => state.assets;
