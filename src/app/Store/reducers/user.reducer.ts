import { createReducer, on } from "@ngrx/store";
import { userState } from "../state/user.state";
import { duplicateUser, duplicateUserSuccess, loginFail, loginSuccess } from "../actions/user.action";
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
  })
)

export function UserReducer(state:any, action: any) {
  return _userReducer(state, action);
}
