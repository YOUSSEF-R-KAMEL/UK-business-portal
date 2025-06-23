import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../feature/Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  const user = _authService.getUserData();
  if (user?.user?.email != '' && user?.user?.email != null) {
    return true;
  } else {
    _router.navigate(['login']);
    return false;
  }
};
