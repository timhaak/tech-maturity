import * as categoryAction from '../actions/category.action';
import {InterfaceStateCategory} from '../interfaces/InterfaceStateCategory';

export const initialState: InterfaceStateCategory = {
  categories: [],
  category_capabilities: [],
  category_capability_levels: [],
};

export function reducer(state = initialState, action: categoryAction.Actions): InterfaceStateCategory {
  switch (action.type) {
    case categoryAction.CATEGORY_ADD: {
      const categories = action.payload;
      return Object.assign({}, state, {categories});
    }
    case categoryAction.CATEGORY_CAPABILITY_ADD: {
      const category_capabilities = action.payload;
      return Object.assign({}, state, {category_capabilities});
    }
    case categoryAction.CATEGORY_CAPABILITY_LEVEL_ADD: {
      const category_capability_levels = action.payload;
      return Object.assign({}, state, {category_capability_levels});
    }
    default: {
      return state;
    }
  }
}


export const getCategories = (state: InterfaceStateCategory) => state.categories;
export const getCategoryCapabilities = (state: InterfaceStateCategory) => state.category_capabilities;
export const getCategoryCapabilityLevels = (state: InterfaceStateCategory) => state.category_capability_levels;

