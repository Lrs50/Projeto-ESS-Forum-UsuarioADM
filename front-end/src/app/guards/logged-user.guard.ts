import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Store } from '@ngrx/store'
import { map, Observable, Subscription, take } from 'rxjs'
import { AppState } from '../app.store'

@Injectable({
    providedIn: 'root',
})
export class LoggedUserGuard implements CanActivate {
    constructor(private store: Store<{ app: AppState }>, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let logged: Observable<boolean> = this.store.select('app').pipe(
            map((state: AppState) => {
                return state.logged
            })
        )

        let isUserLogged: boolean = false

        let userIdSubscription: Subscription = logged.pipe(take(1)).subscribe((userLogged: boolean) => (isUserLogged = userLogged))
        userIdSubscription.unsubscribe()

        if (isUserLogged == false) {
            return true
        } else {
            this.router.navigateByUrl('/home')
            return false
        }
    }
}
