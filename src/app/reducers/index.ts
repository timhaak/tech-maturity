import {ActionReducer, ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {InterfaceStateApp} from '../interfaces/InterfaceStateApp';
import {InterfaceStateAuth} from '../interfaces/InterfaceStateAuth';
import * as fromAuth from './auth.reducer';
import * as fromCategory from './category.reducer';
import * as fromAsset from './asset.reducer';
import {environment} from '../../environments/environment';
import {InterfaceStateCategory} from '../interfaces/InterfaceStateCategory';
import {InterfaceStateAsset} from '../interfaces/InterfaceStateAsset';

export const reducers: ActionReducerMap<InterfaceStateApp> = {
  auth: fromAuth.reducer,
  category: fromCategory.reducer,
  asset: fromAsset.reducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<InterfaceStateApp>): ActionReducer<any, any> {
  return function(state: InterfaceStateApp, action: any): InterfaceStateApp {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: ActionReducer<any, any>[] = !environment.production
  ? [logger]
  : [];

export const selectAuthState = createFeatureSelector<InterfaceStateAuth>('auth');
export const selectCatergoryState = createFeatureSelector<InterfaceStateCategory>('category');
export const selectAssetState = createFeatureSelector<InterfaceStateAsset>('asset');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: InterfaceStateAuth) => state,
);

export const getLoggedIn = createSelector(selectAuthStatusState, fromAuth.getLoggedIn);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

export const getAssets = createSelector(selectAssetState, fromAsset.getAssets);
export const getAssetTypes = createSelector(selectAssetState, fromAsset.getAssetTypes);


