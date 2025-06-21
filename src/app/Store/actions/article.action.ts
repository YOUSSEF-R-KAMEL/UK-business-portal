import { createAction, props } from "@ngrx/store"
import { IArticle } from "../Models/IArticle"

export const loadArticle = createAction("[Article page] load Article")
export const loadArticleSuccess = createAction("[Article page] load Article Success", props<{list: IArticle[]}>())
export const loadArticleFail = createAction("[Article page] load Article Fail", props<{errorMsg: string}>())

