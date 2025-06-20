import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../feature/Services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _userService = inject(UserService);
  const _router = inject(Router);

  const user = _userService.getUserData();
  if (user?.email != '' && user?.email != null) {
    return true;
  } else {
    _router.navigate(['login']);
    return false;
  }
};
