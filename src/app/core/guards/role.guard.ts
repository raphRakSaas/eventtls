import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserRole } from '../models/user-profile.model';
import { AuthService } from '../services/auth.service';

export const roleGuard = (requiredRole: UserRole): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const profile = authService.profile();
    if (profile?.role === requiredRole) {
      return true;
    }

    return router.createUrlTree(['/']);
  };
};
