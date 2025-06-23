import { IAssociate } from "./IAssociate";
import { IUser } from "./IUser";

type UserType = 'user' | 'associate' | 'admin';

export interface ILoginResponse {
  user: IUser | IAssociate;
  role: 'user' | 'associate' | 'admin';
}
