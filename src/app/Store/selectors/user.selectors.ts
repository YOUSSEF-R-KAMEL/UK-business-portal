import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserModel } from "../Models/IUser";

const getUserState = createFeatureSelector<IUserModel>('user');
export const isDuplicateUser = createSelector(getUserState, (state) => state.iasDuplicate)