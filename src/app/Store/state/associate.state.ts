import { IAssociateState } from "../Models/IAssociate";

export const AssociateState:IAssociateState =  {
  list: [],
  errorMsg:'',
  associateObj:{
    id: 0,
    name: "",
    email: "",
    phone: "",
    type: "full-time",
    address: "development",
    associateGroup: "",
    status: false
  }
}