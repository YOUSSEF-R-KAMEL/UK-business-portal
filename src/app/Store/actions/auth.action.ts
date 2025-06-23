import { createAction, props } from '@ngrx/store';
import { IUser, IUserCred } from '../Models/IUser';
import { IAssociate } from '../Models/IAssociate';

export const beginRegister = createAction(
  '[auth page] begin register',
  props<{ userData: IUser }>()
);

export const beginLogin = createAction(
  '[Auth] Begin Login',
  props<{ userCred: IUserCred }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: IUser | IAssociate, role: 'user' | 'associate' | 'admin' }>()
);

export const loginFail = createAction(
  '[Auth] Login Fail',
  props<{ error: string }>()
);

export const duplicateUser = createAction(
  '[auth page] Duplicate User',
  props<{ email: string }>()
);
export const duplicateUserSuccess = createAction(
  '[auth page] Duplicate User',
  props<{ isDuplicate: boolean }>()
);

export const logout = createAction('[Auth] Logout');
