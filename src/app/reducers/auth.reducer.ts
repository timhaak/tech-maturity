import * as auth from '../actions/auth.action';
import {InterfaceStateAuth} from '../interfaces/InterfaceStateAuth';

export const initialState: InterfaceStateAuth = {
  loggedIn: false,
  user: null,
};

export function reducer(state = initialState, action: auth.Actions): InterfaceStateAuth {
  switch (action.type) {
    case auth.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
      };
    }

    case auth.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: InterfaceStateAuth) => state.loggedIn;
export const getUser = (state: InterfaceStateAuth) => state.user;
