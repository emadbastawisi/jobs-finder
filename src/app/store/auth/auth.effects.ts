import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './auth.actions';
import { map, switchMap, of, catchError, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientsService } from 'src/app/clients/data-access/clients.service';
import { UsersLoginResponse } from 'src/app/clients/utils/models/users-login';
import { UsersRegisterResponse } from 'src/app/clients/utils/models/users-register.model';


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
