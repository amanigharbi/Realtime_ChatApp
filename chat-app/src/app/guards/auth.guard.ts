import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { user } from 'rxfire/auth';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return user(auth).pipe(
    take(1),
    map((firebaseUser) => {
      if (firebaseUser) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
