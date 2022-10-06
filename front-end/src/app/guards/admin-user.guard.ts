import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Store } from '@ngrx/store'
import { map, Observable, Subscription, take } from 'rxjs'
import { AppState } from '../app.store'

@Injectable({
    providedIn: 'root',
})
export class AdminUserGuard implements CanActivate {
    constructor(private store: Store<{ app: AppState }>, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let isAdmin: Observable<boolean> = this.store.select('app').pipe(
            map((state: AppState) => {
                return ((state.user.type == 'Admin') as boolean) || ((state.user.type == 'Mod') as boolean)
            })
        )

        let isUserAdmin: boolean = false

        let userIdSubscription: Subscription = isAdmin.pipe(take(1)).subscribe((userLogged: boolean) => (isUserAdmin = userLogged))
        userIdSubscription.unsubscribe()

        if (isUserAdmin == false) {
            this.router.navigateByUrl('/home')
            return false
        } else {
            return true
        }
    }
}
