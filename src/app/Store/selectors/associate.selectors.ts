import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAssociateState } from './../Models/IAssociate';

const getAssociateState = createFeatureSelector<IAssociateState>('associate');

export const getAssociateList = createSelector(getAssociateState, (state) => {
  return state.list
})