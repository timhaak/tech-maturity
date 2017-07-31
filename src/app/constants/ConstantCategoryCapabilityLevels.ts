import {InterfaceCategoryCapabilityLevel} from '../interfaces/InterfaceCategoryCapabilityLevel';

export const ConstantCategoryCapabilityLevels: InterfaceCategoryCapabilityLevel[] = [
  {
    id: '1',
    category_id: '1',
    category_capability_id: '1',
    level: 1,
    value: `Code is in SCM (e.g. git) and used for release, but there is little to no documented or agreed strategy of how to branch, merge, or release code`,
  },
  {
    id: '2',
    category_id: '1',
    category_capability_id: '1',
    level: 2,
    value: `Develop on version branches. Every deployment can be tracked back to understand all changes which went into it by anyone in the team`,
  },
  {
    id: '3',
    category_id: '1',
    category_capability_id: '1',
    level: 3,
    value: `Develop on feature branches that are short-lived (i.e. less than two weeks) and release from merged master`,
  },
  {
    id: '4',
    category_id: '1',
    category_capability_id: '1',
    level: 4,
    value: `Develop and release from master with at least daily code check-ins`,
  },
];
