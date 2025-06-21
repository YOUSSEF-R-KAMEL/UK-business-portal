import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IArticleModel } from '../Models/IArticle';
import { articleAdapter } from "../state/article.state";

const getArticleState = createFeatureSelector<IArticleModel>('article');
const ArticleSelector = articleAdapter.getSelectors()

export const getArticleList = createSelector(getArticleState, ArticleSelector.selectAll)
const selectEntities = createSelector(getArticleState, ArticleSelector.selectEntities);
export const getArticle = (id: number) => createSelector(selectEntities, (state) => state[id]);
export const getErrorMsg = createSelector(getArticleState, state => state.errorMsg)
