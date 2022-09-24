import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Store } from '@ngrx/store'
import { firstValueFrom, map, Observable } from 'rxjs'
import { AppState } from '../app.store'

@Injectable({
    providedIn: 'root',
})
export class NotLoggedGuard implements CanActivate {
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

        let isUserLogged: Promise<boolean> = firstValueFrom(logged)

        return isUserLogged
    }
}
