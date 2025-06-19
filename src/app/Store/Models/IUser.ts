import { EntityState } from "@ngrx/entity";

export interface IUser {
  password: string,
  name: string,
  email: string,
  phone: string,
  role: string,
  gender: string,
  status: boolean
}

export interface IUserCred {
  email: string,
  password: string,
}

export interface IUserInfo {
  name: string,
  email: string,
  role: string,
  status: boolean
}

export interface IUserModel extends EntityState<IUser> {
  loggedInUser: IUserInfo | null,
  iasDuplicate: boolean
}
