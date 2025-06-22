import { createAction, props } from "@ngrx/store"
import { IArticle } from "../Models/IArticle"

export const loadArticle = createAction("[Article page] load Article")
export const loadArticleSuccess = createAction("[Article page] load Article Success", props<{list: IArticle[]}>())
export const loadArticleFail = createAction("[Article page] load Article Fail", props<{errorMsg: string}>())

export const addArticle = createAction("[Article page] Add Article", props<{inputData: IArticle}>())
export const addArticleSuccess = createAction("[Article page] Add Article Success", props<{inputData: IArticle}>())
export const addArticleFail = createAction("[Article page] Add Article Fail", props<{errorMsg: string}>())

export const editArticle = createAction("[Article page] Edit Article", props<{inputData: IArticle, id: number}>())
export const editArticleSuccess = createAction("[Article page] Edit Article Success", props<{inputData: IArticle, id: number}>())
export const editArticleFail = createAction("[Article page] Edit Article Fail", props<{errorMsg: string}>())

export const deleteArticle = createAction("[Article page] Delete Article", props<{ id: number}>())
export const deleteArticleSuccess = createAction("[Article page] Delete Article Success", props<{inputData: IArticle, id: number}>())
export const deleteArticleFail = createAction("[Article page] Delete Article Fail", props<{errorMsg: string}>())

