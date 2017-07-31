import {Action} from '@ngrx/store';
import {InterfaceCategory} from '../interfaces/InterfaceCategory';

export const CATEGORY_ADD = '[Category] ADD';


export class CategoryAdd implements Action {
  readonly type = CATEGORY_ADD;

  constructor(public payload: InterfaceCategory) {}
}

export type Actions =
  | CategoryAdd;
