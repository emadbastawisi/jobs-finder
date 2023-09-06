import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setupActions } from './setup.actions';
import { map, switchMap, of, catchError, tap, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientsService } from 'src/app/clients/data-access/clients.service';
import { UserProfile } from 'src/app/clients/utils/models/userProfile.models';


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
  (actions$ = inject(Actions), clientsService = inject(ClientsService)) => {
    return actions$.pipe(
      ofType(setupActions.careerInterestSuccess),
      tap((response) => {
        clientsService.moveToNextStep();
      }),
    );
  },
  { dispatch: false, functional: true }
);

export const generalInfoEffect = createEffect(
  (actions$ = inject(Actions), clientsService = inject(ClientsService)) => {
    return actions$.pipe(
      ofType(setupActions.generalInfo),
      switchMap(({ request }) => {
        return clientsService.generalInfo(request).pipe(
          map((response: UserProfile) => {
            console.log(response);
            return setupActions.generalInfoSuccess({ response });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            console.log(errorResponce);
            return of(
              setupActions.generalInfoFailure({
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

export const generalInfoSuccessEffect = createEffect(
  (actions$ = inject(Actions), clientsService = inject(ClientsService)) => {
    return actions$.pipe(
      ofType(setupActions.generalInfoSuccess),
      tap((response) => {
        console.log(response);
        clientsService.moveToNextStep();
      }),
    );
  },
  { dispatch: false, functional: true }
);

export const getCVEffect = createEffect(
  (actions$ = inject(Actions), clientsService = inject(ClientsService)) => {
    return actions$.pipe(
      ofType(setupActions.getCV),
      switchMap(() => {
        return clientsService.getCV().pipe(
          map((response: Blob) => {
            return setupActions.getCVSuccess({ response });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            console.log(errorResponce);
            return of(
              setupActions.getCVFailure({
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


export const getCVSuccessEffect = createEffect(
  (actions$ = inject(Actions), clientsService = inject(ClientsService)) => {
    return actions$.pipe(
      ofType(setupActions.getCVSuccess),
      take(1),
      tap((response) => {
        const anchor = document.createElement('a');
        anchor.download = clientsService.userProfile$()?.cv?.cv_name || 'cv.pdf';
        anchor.href = window.URL.createObjectURL(response.response);
        anchor.click();
        anchor.remove();
      }),
    );
  },
  { functional: true }
);


export const addCVEffect = createEffect(
  (actions$ = inject(Actions), clientsService = inject(ClientsService)) => {
    return actions$.pipe(
      ofType(setupActions.addCV),
      switchMap(({ request }) => {
        return clientsService.addCV(request).pipe(
          map((response: UserProfile) => {
            console.log(response);
            return setupActions.addCVSuccess({ response });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            console.log(errorResponce);
            return of(
              setupActions.addCVFailure({
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

export const deleteCVEffect = createEffect(
  (actions$ = inject(Actions), clientsService = inject(ClientsService)) => {
    return actions$.pipe(
      ofType(setupActions.deleteCV),
      switchMap(() => {
        return clientsService.deleteCV().pipe(
          map((response: UserProfile) => {
            console.log(response);
            return setupActions.deleteCVSuccess({ response });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            console.log(errorResponce);
            return of(
              setupActions.deleteCVFailure({
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
