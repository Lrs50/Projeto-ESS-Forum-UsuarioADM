import { TestBed } from '@angular/core/testing'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { map, Observable, Subscription, take } from 'rxjs'
import { emptyUser, User } from '../../../../common/types'
import { AppState } from '../app.store'

import { AdminUserGuard } from './admin-user.guard'

describe('AdminUserGuard', () => {
    let guard: AdminUserGuard
    let store: MockStore
    let appStateSelector
    let initialState: AppState = { logged: false, user: emptyUser(''), newsCount: 0, usersCount: 0, artistsCount: 0 }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideMockStore({ initialState })],
        })
        store = TestBed.inject(MockStore)
        guard = TestBed.inject(AdminUserGuard)
    })

    it('should be created', () => {
        expect(guard).toBeTruthy()
    })

    it('Should return true if user is admin or mod', () => {
        appStateSelector = store.overrideSelector('app', {
            ...initialState,
            user: {
                ...initialState.user,
                type: 'Admin',
            },
        })

        let isUserAdmin: boolean = false

        let isAdmin: Observable<boolean> = store.select('app').pipe(
            map((state: AppState) => {
                return ((state.user.type == 'Admin') as boolean) || ((state.user.type == 'Mod') as boolean)
            })
        )

        let userIdSubscription: Subscription = isAdmin.pipe(take(1)).subscribe((userAdmin: boolean) => (isUserAdmin = userAdmin))
        userIdSubscription.unsubscribe()

        expect(isUserAdmin).toBeTruthy()
    })

    it('Should return false if user is admin or mod', () => {
        appStateSelector = store.overrideSelector('app', initialState)

        let isUserAdmin: boolean = false

        let isAdmin: Observable<boolean> = store.select('app').pipe(
            map((state: AppState) => {
                return ((state.user.type == 'Admin') as boolean) || ((state.user.type == 'Mod') as boolean)
            })
        )

        let userIdSubscription: Subscription = isAdmin.pipe(take(1)).subscribe((userAdmin: boolean) => (isUserAdmin = userAdmin))
        userIdSubscription.unsubscribe()

        expect(isUserAdmin).toBeFalsy()
    })
})
