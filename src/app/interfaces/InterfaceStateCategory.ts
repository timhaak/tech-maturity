import {InterfaceCategory} from './InterfaceCategory';
import {InterfaceCategoryCapability} from './InterfaceCategoryCapability';
import {InterfaceCategoryCapabilityLevel} from './InterfaceCategoryCapabilityLevel';

export interface InterfaceStateCategory {
  categories: InterfaceCategory[];
  category_capabilities: InterfaceCategoryCapability[];
  category_capability_levels: InterfaceCategoryCapabilityLevel[];
}
