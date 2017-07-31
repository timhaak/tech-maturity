import {InterfaceUser} from './InterfaceUser';

export interface InterfaceStateAuth {
  loggedIn: boolean;
  user: InterfaceUser | null;
}
