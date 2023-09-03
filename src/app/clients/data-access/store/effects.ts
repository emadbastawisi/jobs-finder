import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientsService } from '../clients.service';
import { authActions, setupActions } from './actions';
import { map, switchMap, of, catchError, tap } from 'rxjs';
import { UsersRegisterResponse } from '../../utils/models/users-register.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersLoginResponse } from '../../utils/models/users-login';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserProfile } from '../../utils/models/userProfile.models';

export const signupEffect = createEffect(
  (actions$ = inject(Actions), clientsService = inject(ClientsService)) => {
    return actions$.pipe(
      ofType(authActions.signup),
      switchMap(({ request }) => {
        return clientsService.register(request).pipe(
          map((response: UsersRegisterResponse) => {
            return authActions.signupSuccess({ response });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(
              authActions.signupFailure({ errors: errorResponce.error.detail })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const signupSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.signupSuccess),
      tap(() => {
        router.navigateByUrl('/clients/setup');
      })
    );
  },
  { dispatch: false, functional: true }
);

export const loginEffect = createEffect(
  (actions$ = inject(Actions), clientsService = inject(ClientsService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return clientsService.login(request).pipe(
          map((response: UsersLoginResponse) => {
            return authActions.loginSuccess({ response });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({ errors: errorResponce.error.detail })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const loginSuccessEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    dialog = inject(MatDialog)
  ) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap((value) => {
        localStorage.setItem('token', value.response.access_token);
        dialog.closeAll();
        router.navigateByUrl('/home');
      })
    );
  },
  { dispatch: false, functional: true }
);

export const logoutEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        localStorage.removeItem('token');
        router.navigateByUrl('/');
      })
    );
  },
  { dispatch: false, functional: true }
);

export const getCurrentUserEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        return authService.getCurrentUser().pipe(
          map((response) => {
            return authActions.getCurrentUserSuccess({ response });
          }),
          catchError(() => {
            return of(authActions.getCurrentUserFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const getUserProfileEffect = createEffect(
  (actions$ = inject(Actions), clientsService = inject(ClientsService)) => {
    return actions$.pipe(
      ofType(setupActions.getUserProfile),
      switchMap(() => {
        return clientsService.getUserProfile().pipe(
          map((response) => {
            return setupActions.getUserProfileSuccess({ response });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(
              setupActions.getUserProfileFailure(errorResponce.error.detail)
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const careerInterestEffect = createEffect(
  (actions$ = inject(Actions), clientsService = inject(ClientsService)) => {
    return actions$.pipe(
      ofType(setupActions.careerInterest),
      switchMap(({ request }) => {
        return clientsService.careerInterest(request).pipe(
          map((response: UserProfile) => {
            console.log(response);
            return setupActions.careerInterestSuccess({ response });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            console.log(errorResponce);
            return of(
              setupActions.careerInterestFailure({
                errors: errorResponce.error.detail,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const careerInterestSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(setupActions.careerInterestSuccess),
      tap((response) => {
        console.log(response);
      })
    );
  },
  { dispatch: false, functional: true }
);
