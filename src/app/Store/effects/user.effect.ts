import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, from } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { UserService } from "../../feature/Services/user.service";
import { showAlert } from "../actions/App.actions";
import { Router } from "@angular/router";
import { beginLogin, beginRegister, duplicateUser, duplicateUserSuccess } from "../actions/user.action";

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private _userService = inject(UserService);
  private _router = inject(Router);

  userRegister$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(beginRegister),
        exhaustMap((action) =>
          this._userService.register(action.userData).pipe(
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

  userLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(beginLogin),
        exhaustMap((action) =>
          this._userService.login(action.userCred).pipe(
            map((data) => {
              if(data.length > 0){
                const userData = data[0]
                if(userData.status){
                  this._userService.saveInfo(userData)
                  this._router.navigate(['']);
                  return showAlert({ message: "Login successfully", resultType: "success" });
                }
                else {
                  return showAlert({ message: "Inactive User", resultType: "error" });
                }
              }
              else {
                return showAlert({ message: "Login failed: invalid credential", resultType: "error" });
              }
            }),
            catchError((error) =>
              of(showAlert({ message: "Login failed: " + error.message, resultType: "error" }))
            )
          )
        )
      );
    },
    { useEffectsErrorHandler: false }
  );

  duplicateUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(duplicateUser),
        exhaustMap((action) =>
          this._userService.duplicateEmail(action.email).pipe(
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
