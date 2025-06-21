import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ArticleService } from '../../feature/Services/article.service';
import { loadArticle, loadArticleFail, loadArticleSuccess } from '../actions/article.action';

@Injectable()
export class ArticleEffects {
  private actions$ = inject(Actions);
  private _articlesService = inject(ArticleService);

  loadArticle$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadArticle),
        exhaustMap(() =>
          this._articlesService.getArticles().pipe(
            map((data) => loadArticleSuccess({ list: data })),
            catchError((error) =>
              of(loadArticleFail({ errorMsg: error.message }))
            )
          )
        )
      );
    },
    { useEffectsErrorHandler: false }
  );
}
