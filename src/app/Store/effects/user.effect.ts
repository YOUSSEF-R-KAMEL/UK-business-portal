import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { UserService } from "../../feature/Services/user.service";
import { loadUser, loadUserFail, loadUserSuccess } from "../actions/user.action";

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private _userService = inject(UserService);

  loadUsers$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadUser),
        exhaustMap(() =>
          this._userService.getAllUsers().pipe(
            map((data) => loadUserSuccess({ list: data })),
            catchError((error) =>
              of(loadUserFail({ errorMsg: error.message }))
            )
          )
        )
      );
    },
    { useEffectsErrorHandler: false }
  );
}
