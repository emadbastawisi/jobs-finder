import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { map, take } from "rxjs/operators"
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../store/auth/auth.reducers";

export const authGuard = () => {

  const router = inject(Router)
  const store = inject(Store)
  const currentUser$ = store.select(selectCurrentUser)

  currentUser$.pipe(
    take(1),
    map((currentUser) => {
      if (!currentUser) {
        router.navigateByUrl('/clients/login')
        return false
      }
      return true
    }
    )).subscribe()
}