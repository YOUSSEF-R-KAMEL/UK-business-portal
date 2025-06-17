import { createAction, props } from "@ngrx/store";
import { IAssociate } from "../Models/IAssociate";

export const loadAssociate = createAction("[associate page] load Associate")
export const loadAssociateSuccess = createAction("[associate page] load Associate Success", props<{list: IAssociate[]}>())
export const loadAssociateFail = createAction("[associate page] load Associate Fail", props<{errorMsg: string}>())

export const addAssociate = createAction("[associate page] Add Associate", props<{inputData: IAssociate}>())
export const addAssociateSuccess = createAction("[associate page] Add Associate Success", props<{inputData: IAssociate}>())
export const addAssociateFail = createAction("[associate page] Add Associate Fail", props<{errorMsg: string}>())

export const editAssociate = createAction("[associate page] Edit Associate", props<{inputData: IAssociate, id: number}>())
export const editAssociateSuccess = createAction("[associate page] Edit Associate Success", props<{inputData: IAssociate, id: number}>())
export const editAssociateFail = createAction("[associate page] Edit Associate Fail", props<{errorMsg: string}>())

export const deleteAssociate = createAction("[associate page] Delete Associate", props<{ id: number}>())
export const deleteAssociateSuccess = createAction("[associate page] Delete Associate Success", props<{inputData: IAssociate, id: number}>())
export const deleteAssociateFail = createAction("[associate page] Delete Associate Fail", props<{errorMsg: string}>())


