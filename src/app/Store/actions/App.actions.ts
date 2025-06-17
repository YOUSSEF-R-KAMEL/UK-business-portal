import { createAction, props } from "@ngrx/store";

export const showAlert = createAction('[app] show alert', props<{message: string, resultType: string}>())
export const emptyAction = createAction('[app] empty action')