import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ArticleService } from '../../feature/Services/article.service';
import {
  addArticle,
  addArticleFail,
  addArticleSuccess,
  deleteArticle,
  deleteArticleFail,
  deleteArticleSuccess,
  editArticle,
  editArticleFail,
  editArticleSuccess,
  loadArticle,
  loadArticleFail,
  loadArticleSuccess,
} from '../actions/article.action';
import { IArticle } from '../Models/IArticle';

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

  addArticle$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addArticle),
        exhaustMap((action) => {
          return this._articlesService.addArticle(action.inputData).pipe(
            map((data) => {
              return addArticleSuccess({ inputData: data });
            }),
            catchError((error) => {
              return of(addArticleFail({ errorMsg: error.message }));
            })
          );
        })
      );
    },
    { useEffectsErrorHandler: false }
  );

  editArticle$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(editArticle),
        exhaustMap((action) => {
          return this._articlesService
            .editArticle(action.inputData, action.id)
            .pipe(
              map((data) => {
                return editArticleSuccess({ inputData: data, id: data.id });
              }),
              catchError((error) => {
                return of(editArticleFail({ errorMsg: error.message }));
              })
            );
        })
      );
    },
    { useEffectsErrorHandler: false }
  );

  deleteArticle$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteArticle),
        exhaustMap((action) => {
          return this._articlesService.deleteArticle(action.id).pipe(
            map(() => {
              return deleteArticleSuccess({
                inputData: {} as IArticle,
                id: action.id,
              });
            }),
            catchError((error) => {
              return of(deleteArticleFail({ errorMsg: error.message }));
            })
          );
        })
      );
    },
    { useEffectsErrorHandler: false }
  );
}
