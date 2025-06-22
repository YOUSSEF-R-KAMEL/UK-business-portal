import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserModel } from "../Models/IUser";
import { userAdapter } from "../state/user.state";

const getUserState = createFeatureSelector<IUserModel>('user');
export const isDuplicateUser = createSelector(getUserState, (state) => state.iasDuplicate)

const UserSelector = userAdapter.getSelectors()

export const getUserList = createSelector(getUserState, UserSelector.selectAll)
const selectEntities = createSelector(getUserState, UserSelector.selectEntities);
export const getUser = (id: number) => createSelector(selectEntities, (state) => state[id]);
export const getErrorMsg = createSelector(getUserState, state => state.errorMsg)