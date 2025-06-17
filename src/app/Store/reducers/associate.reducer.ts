import { createReducer, on } from '@ngrx/store';
import { AssociateState } from '../state/associate.state';
import {
  loadAssociate,
  loadAssociateSuccess,
  loadAssociateFail,
  addAssociate,
  addAssociateSuccess,
  addAssociateFail,
  editAssociate,
  editAssociateSuccess,
  editAssociateFail,
  deleteAssociate,
  deleteAssociateSuccess,
  deleteAssociateFail,
} from '../actions/associate.actions';

export const associateReducer = createReducer(
  AssociateState,
  on(loadAssociate, (state) => ({
    ...state,
    errorMsg: '',
  })),
  on(loadAssociateSuccess, (state, { list }) => ({
    ...state,
    list: list,
    errorMsg: '',
  })),
  on(loadAssociateFail, (state, { errorMsg }) => ({
    ...state,
    errorMsg: errorMsg,
  })),

  // add Associate
  on(addAssociate, (state) => ({
    ...state,
    errorMsg: '',
  })),
  on(addAssociateSuccess, (state, { inputData }) => ({
    ...state,
    list: [...state.list, inputData],
    errorMsg: '',
  })),
  on(addAssociateFail, (state, { errorMsg }) => ({
    ...state,
    errorMsg: errorMsg,
  })),

  // edit Associate
  on(editAssociate, (state) => ({
    ...state,
    errorMsg: '',
  })),
  on(editAssociateSuccess, (state, { inputData, id }) => ({
    ...state,
    list: state.list.map(associate =>
      associate.id === id ? inputData : associate
    ),
    errorMsg: '',
  })),
  on(editAssociateFail, (state, { errorMsg }) => ({
    ...state,
    errorMsg: errorMsg,
  })),

  // delete Associate
  on(deleteAssociate, (state) => ({
    ...state,
    errorMsg: '',
  })),
  on(deleteAssociateSuccess, (state, { id }) => ({
    ...state,
    list: state.list.filter(associate => associate.id !== id),
    errorMsg: '',
  })),
  on(deleteAssociateFail, (state, { errorMsg }) => ({
    ...state,
    errorMsg: errorMsg,
  }))
);
