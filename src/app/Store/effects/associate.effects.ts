import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AssociateService } from '../../Services/associate.service';
import { IAssociate } from '../Models/IAssociate';
import {
  loadAssociate,
  loadAssociateSuccess,
  loadAssociateFail,
  addAssociate,
  addAssociateSuccess,
  addAssociateFail,
  editAssociate,
  editAssociateSuccess,
  editAssociateFail,
  deleteAssociate,
  deleteAssociateSuccess,
  deleteAssociateFail,
} from '../actions/associate.actions';

@Injectable()
export class AssociateEffects {
  private actions$ = inject(Actions);
  private _associateService = inject(AssociateService);

  loadAssociate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadAssociate),
        exhaustMap((action) =>
          this._associateService.getAssociates().pipe(
            map((data) => loadAssociateSuccess({ list: data })),
            catchError((error) =>
              of(loadAssociateFail({ errorMsg: error.message }))
            )
          )
        )
      );
    },
    { useEffectsErrorHandler: false }
  );

  addAssociate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addAssociate),
        exhaustMap((action) => {
          console.log('AddAssociate effect triggered with:', action.inputData);
          return this._associateService.addAssociate(action.inputData).pipe(
            map((data) => {
              console.log('Associate added successfully:', data);
              return addAssociateSuccess({ inputData: data });
            }),
            catchError((error) => {
              console.error('Error adding associate:', error);
              return of(addAssociateFail({ errorMsg: error.message }));
            })
          );
        })
      );
    },
    { useEffectsErrorHandler: false }
  );

  editAssociate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(editAssociate),
        exhaustMap((action) => {
          console.log('EditAssociate effect triggered with:', action.inputData, 'ID:', action.id);
          return this._associateService.editAssociate(action.inputData, action.id).pipe(
            map((data) => {
              console.log('Associate edited successfully:', data);
              return editAssociateSuccess({ inputData: data, id: data.id });
            }),
            catchError((error) => {
              console.error('Error editing associate:', error);
              return of(editAssociateFail({ errorMsg: error.message }));
            })
          );
        })
      );
    },
    { useEffectsErrorHandler: false }
  );

  deleteAssociate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteAssociate),
        exhaustMap((action) => {
          console.log('DeleteAssociate effect triggered for ID:', action.id);
          return this._associateService.deleteAssociate(action.id).pipe(
            map(() => {
              console.log('Associate deleted successfully, ID:', action.id);
              return deleteAssociateSuccess({ inputData: {} as IAssociate, id: action.id });
            }),
            catchError((error) => {
              console.error('Error deleting associate:', error);
              return of(deleteAssociateFail({ errorMsg: error.message }));
            })
          );
        })
      );
    },
    { useEffectsErrorHandler: false }
  );
}
