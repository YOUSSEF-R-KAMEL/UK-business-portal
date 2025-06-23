import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, from } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { showAlert } from "../actions/App.actions";
import { Router } from "@angular/router";
import { beginLogin, beginRegister, duplicateUser, duplicateUserSuccess } from "../actions/auth.action";
import { AuthService } from "../../feature/Services/auth.service";

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  userRegister$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(beginRegister),
        exhaustMap((action) =>
          this._authService.register(action.userData).pipe(
            map((data) => {
              this._router.navigate(['/login']);
              return showAlert({ message: "registered successfully", resultType: "success" });
            }),
            catchError((error) =>
              of(showAlert({ message: "registration failed: " + error.message, resultType: "error" }))
            )
          )
        )
      );
    },
    { useEffectsErrorHandler: false }
  );

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(beginLogin),
      exhaustMap((action) =>
        this._authService.login(action.userCred).pipe(
          map((data) => {
            if (data.user) {
              this._authService.saveInfo(data);
              this._router.navigate(['']);
              return showAlert({ message: 'Login successfully', resultType: 'success' });
            } else {
              return showAlert({ message: 'Login failed: Invalid credentials', resultType: 'error' });
            }
          }),
          catchError((error) =>
            of(showAlert({ message: 'Login failed: ' + error.message, resultType: 'error' }))
          )
        )
      )
    ),
    { useEffectsErrorHandler: false }
  );

  duplicateUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(duplicateUser),
        exhaustMap((action) =>
          this._authService.duplicateEmail(action.email).pipe(
            mergeMap((data) => {
              if(data.length > 0){
                return from([
                  duplicateUserSuccess({isDuplicate: true}),
                  showAlert({ message: "Email Already Exist", resultType: "error" })
                ]);
              }
              else {
                return of(duplicateUserSuccess({isDuplicate: false}))
              }
            }),
            catchError((error) =>
              of(showAlert({ message: "registration failed: " + error.message, resultType: "error" }))
            )
          )
        )
      );
    },
    { useEffectsErrorHandler: false }
  );
}
