
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientsService } from '../clients.service';
import { authActions } from './actions';
import { map, switchMap, of, catchError, tap } from 'rxjs';
import { UsersRegisterResponse } from '../../utils/models/users-register.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersLoginResponse } from '../../utils/models/users-login';

export const signupEffect = createEffect(
  (actions$ = inject(Actions), clientsService = inject(ClientsService)) => {
    return actions$.pipe(
      ofType(authActions.signup),
      switchMap(({ request }) => {
        return clientsService.register(request).pipe(
          map((response: UsersRegisterResponse) => {
            return authActions.signupSuccess({ response })
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(
              authActions.signupFailure(
                { errors: errorResponce.error.detail }
              ))
          })
        )
      })
    )
  }
  , { functional: true }
)

export const signupSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.signupSuccess),
      tap(() => {
        router.navigateByUrl('/clients/login')
      })
    )
  }
  , { dispatch: false, functional: true }
)

export const loginEffect = createEffect(
  (actions$ = inject(Actions), clientsService = inject(ClientsService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return clientsService.login(request).pipe(
          map((response: UsersLoginResponse) => {
            return authActions.loginSuccess({ response })
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(
              authActions.loginFailure(
                { errors: errorResponce.error.detail }
              ))
          })
        )
      })
    )
  }
  , { functional: true }
)

export const loginSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap((value) => {
        console.log(value);
        localStorage.setItem('token', value.response.access_token)
        localStorage.setItem('username', value.response.username)
        router.navigate(['/home'])
        window.location.reload();
      })
    )
  }
  , { dispatch: false, functional: true }
)



