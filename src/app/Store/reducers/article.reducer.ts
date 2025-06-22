import { createReducer, on } from '@ngrx/store';
import { articleAdapter, articleState } from '../state/article.state';
import { addArticle, addArticleFail, addArticleSuccess, deleteArticle, deleteArticleFail, deleteArticleSuccess, editArticle, editArticleFail, editArticleSuccess, loadArticle, loadArticleFail, loadArticleSuccess } from '../actions/article.action';

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

  // add Article
  on(addArticle, (state) => ({
    ...state,
    errorMsg: '',
  })),
  on(addArticleSuccess, (state, { inputData }) =>
    articleAdapter.addOne(inputData, { ...state, errorMsg: '' })
  ),
  on(addArticleFail, (state, { errorMsg }) => ({
    ...state,
    errorMsg: errorMsg,
  })),

  // edit Article
  on(editArticle, (state) => ({
    ...state,
    errorMsg: '',
  })),
  // })),
  on(editArticleSuccess, (state, { inputData, id }) =>
    articleAdapter.updateOne(
      { id, changes: inputData },
      { ...state, errorMsg: '' }
    )
  ),
  on(editArticleFail, (state, { errorMsg }) => ({
    ...state,
    errorMsg: errorMsg,
  })),

  // delete Article
  on(deleteArticle, (state) => ({
    ...state,
    errorMsg: '',
  })),
  on(deleteArticleSuccess, (state, { id }) =>
    articleAdapter.removeOne(id, { ...state, errorMsg: '' })
  ),
  on(deleteArticleFail, (state, { errorMsg }) => ({
    ...state,
    errorMsg: errorMsg,
  }))

);
