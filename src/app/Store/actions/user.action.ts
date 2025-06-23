import { createAction, props } from "@ngrx/store";
import { IUser } from "../Models/IUser";

export const loadUser = createAction("[User page] load User")
export const loadUserSuccess = createAction("[User page] load User Success", props<{list: IUser[]}>())
export const loadUserFail = createAction("[User page] load User Fail", props<{errorMsg: string}>())