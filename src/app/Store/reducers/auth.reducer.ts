import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFail, duplicateUserSuccess, logout } from '../actions/auth.action';
import { authState } from '../state/auth.state';

export const authReducer = createReducer(
  authState,
  on(loginSuccess, (state, { user, role }) => ({
    ...state,
    loggedInUser: user,
    role: role,
    isLogged: true,
    errorMsg: ''
  })),

  on(loginFail, (state) => {
    return {
      ...state,
      loggedInUser: null
    };
  }),

  on(duplicateUserSuccess, (state, { isDuplicate }) => ({
    ...state,
    iasDuplicate: isDuplicate
  })),

  on(logout, () => ({
    ...authState
  }))
);
