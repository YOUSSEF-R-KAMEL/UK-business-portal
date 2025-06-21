import { createReducer, on } from '@ngrx/store';
import { articleAdapter, articleState } from '../state/article.state';
import { loadArticle, loadArticleFail, loadArticleSuccess } from '../actions/article.action';

export const ArticleReducer = createReducer(
  articleState,
  on(loadArticle, (state) => ({
    ...state,
    errorMsg: '',
  })),
  on(loadArticleSuccess, (state, action) => {
    return articleAdapter.setAll(action.list, {
      ...state,
      errorMsg: ''
    })
  }),
  on(loadArticleFail, (state, action) => ({
    ...state,
    errorMsg: action.errorMsg,
  })),

);
