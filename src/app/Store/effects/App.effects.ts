import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { showAlert } from '../actions/App.actions';
import { ToastService } from '../../Services/toast.service';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private _toastService = inject(ToastService);

  showAlert$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(showAlert),
      tap(action => {
        console.log('ShowAlert effect triggered with:', action);
        switch (action.resultType) {
          case 'success':
            console.log('Showing success toast');
            this._toastService.showSuccess(action.message);
            break;
          case 'error':
            console.log('Showing error toast');
            this._toastService.showError(action.message);
            break;
          case 'info':
            console.log('Showing info toast');
            this._toastService.showInfo(action.message);
            break;
          case 'warning':
            console.log('Showing warning toast');
            this._toastService.showWarning(action.message);
            break;
        }
      }),
      map(() => ({ type: '[App] Alert Shown' }))
    );
  }, { dispatch: false });
}
