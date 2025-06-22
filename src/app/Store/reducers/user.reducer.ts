import { createReducer, on } from "@ngrx/store";
import { userAdapter, userState } from "../state/user.state";
import { duplicateUser, duplicateUserSuccess, loadUser, loadUserFail, loadUserSuccess, loginFail, loginSuccess } from "../actions/user.action";
import { IUser, IUserInfo } from "../Models/IUser";

const _userReducer = createReducer(
  userState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      loggedInUser: action.userinfo
    };
  }),
  on(loginFail, (state) => {
    return {
      ...state,
      loggedInUser: null
    };
  }),
  on(duplicateUserSuccess, (state, action) => {
    return {
      ...state,
      iasDuplicate: action.isDuplicate
    }
  }),

  // get all users
  on(loadUser, (state) => ({
    ...state,
    errorMsg: '',
  })),
  on(loadUserSuccess, (state, action) => {
    return userAdapter.setAll(action.list, {
      ...state,
      errorMsg: ''
    })
  }),
  on(loadUserFail, (state, action) => ({
    ...state,
    errorMsg: action.errorMsg,
  })),

)

export function UserReducer(state:any, action: any) {
  return _userReducer(state, action);
}
