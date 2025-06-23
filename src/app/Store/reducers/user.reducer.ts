import { createReducer, on } from "@ngrx/store";
import { loadUser, loadUserFail, loadUserSuccess } from "../actions/user.action";
import { authAdapter, authState } from "../state/auth.state";

const _userReducer = createReducer(
  authState,
  // get all users
  on(loadUser, (state) => ({
    ...state,
    errorMsg: '',
  })),
  on(loadUserSuccess, (state, action) => {
    return authAdapter.setAll(action.list, {
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
