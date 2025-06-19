import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IUser, IUserModel } from "../Models/IUser";

export const userAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();
export const userState:IUserModel = userAdapter.getInitialState({
    loggedInUser: null,
    iasDuplicate: false
})

