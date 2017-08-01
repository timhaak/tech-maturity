import * as categoryAction from '../actions/category.action';
import {ConstantCategories} from '../constants/ConstantCategories';
import {InterfaceStateCategory} from '../interfaces/InterfaceStateCategory';
import {ConstantCategoryCapabilities} from '../constants/ConstantCategoryCapabilities';
import {ConstantCategoryCapabilityLevels} from '../constants/ConstantCategoryCapabilityLevels';

export const initialState: InterfaceStateCategory = {
  categories: ConstantCategories,
  category_capabilities: ConstantCategoryCapabilities,
  category_capability_levels: ConstantCategoryCapabilityLevels,
};

export function reducer(state = initialState, action: categoryAction.Actions): InterfaceStateCategory {
  switch (action.type) {
    case categoryAction.CATEGORY_ADD: {
      return Object.assign({}, state, {categories: state.categories.push(action.payload)});
    }
    default: {
      return state;
    }
  }
}


export const getCategories = (state: InterfaceStateCategory) => state.categories;
export const getCategoryCapabilities = (state: InterfaceStateCategory) => state.category_capabilities;
export const getCategoryCapabilityLevels = (state: InterfaceStateCategory) => state.category_capability_levels;

