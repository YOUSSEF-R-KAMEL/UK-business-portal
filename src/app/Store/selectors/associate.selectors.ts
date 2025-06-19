import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAssociateModel } from './../Models/IAssociate';
import { associateAdapter } from "../state/associate.state";

const getAssociateState = createFeatureSelector<IAssociateModel>('associate');
const associateSelector = associateAdapter.getSelectors()

// export const getAssociateList = createSelector(getAssociateState, (state) => {
//   return state.list
// })

export const getAssociateList = createSelector(getAssociateState, associateSelector.selectAll)
const selectEntities = createSelector(getAssociateState, associateSelector.selectEntities);
export const getAssociate = (id: number) => createSelector(selectEntities, (state) => state[id]);
export const getErrorMsg = createSelector(getAssociateState, state => state.errorMsg)