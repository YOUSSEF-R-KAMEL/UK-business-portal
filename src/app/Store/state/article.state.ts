import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IArticle, IArticleModel } from '../Models/IArticle';

export const articleAdapter: EntityAdapter<IArticle> = createEntityAdapter<IArticle>({
  selectId: (article) => article.id  // Replace with correct field
});
export const articleState:IArticleModel = articleAdapter.getInitialState({
  errorMsg: '',
  isLoading: false
})

