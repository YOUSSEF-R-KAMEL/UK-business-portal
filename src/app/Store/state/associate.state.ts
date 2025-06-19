import { IAssociateModel } from "../Models/IAssociate";
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IAssociate } from '../Models/IAssociate';
import { flatMap } from "rxjs";

export const associateAdapter: EntityAdapter<IAssociate> = createEntityAdapter<IAssociate>({
  selectId: (associate: IAssociate) => associate.name,
  sortComparer: sortbyName
});
export const AssociateState:IAssociateModel = associateAdapter.getInitialState({
  errorMsg: '',
  isLoading: false
})

export function sortbyName(a:IAssociate, b: IAssociate){
  return a.name.localeCompare(b.name)
}


// export const AssociateState:IAssociateState =  {
//   list: [],
//   errorMsg:'',
//   associateObj:{
//     id: 0,
//     name: "",
//     email: "",
//     phone: "",
//     type: "full-time",
//     address: "development",
//     associateGroup: "",
//     status: false
//   }
// }
