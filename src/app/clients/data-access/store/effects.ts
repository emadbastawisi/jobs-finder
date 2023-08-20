
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientsService } from '../clients.service';
import { authActions } from './actions';
import { map, switchMap, of, catchError, tap } from 'rxjs';
import { UsersRegisterResponse } from '../../utils/models/users-register.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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



