import {Action} from '@ngrx/store';
import {InterfaceCategory} from '../interfaces/InterfaceCategory';
import {InterfaceAllData} from '../interfaces/InterfaceAllData';
import {InterfaceCategoryCapability} from '../interfaces/InterfaceCategoryCapability';
import {InterfaceCategoryCapabilityLevel} from '../interfaces/InterfaceCategoryCapabilityLevel';

export const CATEGORY_ADD = '[Category] ADD';
export const CATEGORY_CAPABILITY_ADD = '[Category Capability] ADD';
export const CATEGORY_CAPABILITY_LEVEL_ADD = '[Category Capability  Level] ADD';
export const ALL_DATA_ADD = '[All Data] ADD';


export class CategoryAdd implements Action {
  readonly type = CATEGORY_ADD;
  constructor(public payload: InterfaceCategory[]) {}
}

export class CategoryCapabilityAdd implements Action {
  readonly type = CATEGORY_CAPABILITY_ADD;
  constructor(public payload: InterfaceCategoryCapability[]) {}
}

export class CategoryCapabilityLevelAdd implements Action {
  readonly type = CATEGORY_CAPABILITY_LEVEL_ADD;
  constructor(public payload: InterfaceCategoryCapabilityLevel[]) {}
}

export class AllDataAdd implements Action {
  readonly type = ALL_DATA_ADD;
  constructor(public payload: InterfaceAllData) {}
}

export type Actions =
  | CategoryAdd
  | CategoryCapabilityAdd
  | CategoryCapabilityLevelAdd
  | AllDataAdd;
