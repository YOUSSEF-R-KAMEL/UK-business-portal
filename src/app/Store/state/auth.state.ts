import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IUser, IUserModel } from "../Models/IUser";

export const authAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();
export const authState:IUserModel = authAdapter.getInitialState({
    loggedInUser: null,
    iasDuplicate: false,
    errorMsg: ''
})

