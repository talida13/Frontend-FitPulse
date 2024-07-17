import { inject, Injector } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AdminGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('isAdmin') !== 'true') {
    const router = inject(Router);
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
