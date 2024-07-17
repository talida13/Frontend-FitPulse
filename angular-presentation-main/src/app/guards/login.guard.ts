import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  var something = false;
  if(something) {
    return true
  } 
  return router.createUrlTree(['unauthorized']);
}
