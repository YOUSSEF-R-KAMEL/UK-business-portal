import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { showAlert } from '../actions/App.actions';
import { ToastService } from '../../feature/Services/toast.service';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private _toastService = inject(ToastService);

  showAlert$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(showAlert),
      tap(action => {
        switch (action.resultType) {
          case 'success':
            this._toastService.showSuccess(action.message);
            break;
          case 'error':
            this._toastService.showError(action.message);
            break;
          case 'info':
            this._toastService.showInfo(action.message);
            break;
          case 'warning':
            this._toastService.showWarning(action.message);
            break;
        }
      }),
      map(() => ({ type: '[App] Alert Shown' }))
    );
  }, { dispatch: false });
}
