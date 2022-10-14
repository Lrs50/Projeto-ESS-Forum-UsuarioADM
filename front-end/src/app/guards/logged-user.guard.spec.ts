import { TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { map, Observable, Subscription, take } from 'rxjs'
import { emptyUser } from '../../../../common/types'
import { AppState } from '../app.store'

import { LoggedUserGuard } from './logged-user.guard'

describe('LoggedUserGuard', () => {
    let guard: LoggedUserGuard
    let initialState: AppState = {
        logged: false,
        user: emptyUser(''),
        newsCount: 0,
        usersCount: 0,
        artistsCount: 0,
        currentURL: '/home',
        previousURL: '/home',
    }
    let appStateSelector
    let store: MockStore
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideMockStore({ initialState })],
        })
        guard = TestBed.inject(LoggedUserGuard)
        store = TestBed.inject(MockStore)
    })

    it('should be created', () => {
        expect(guard).toBeTruthy()
    })

    it('Should return true if user is logged', () => {
        appStateSelector = store.overrideSelector('app', {
            ...initialState,
            logged: true,
        })

        let isUserLogged: boolean = false

        let isLogged: Observable<boolean> = store.select('app').pipe(
            map((state: AppState) => {
                return state.logged
            })
        )

        let userIdSubscription: Subscription = isLogged.pipe(take(1)).subscribe((userLogged: boolean) => (isUserLogged = userLogged))
        userIdSubscription.unsubscribe()

        expect(isUserLogged).toBeTruthy()
    })

    it('Should return false if user is logged', () => {
        appStateSelector = store.overrideSelector('app', initialState)

        let isUserLogged: boolean = false

        let isLogged: Observable<boolean> = store.select('app').pipe(
            map((state: AppState) => {
                return state.logged
            })
        )

        let userIdSubscription: Subscription = isLogged.pipe(take(1)).subscribe((userLogged: boolean) => (isUserLogged = userLogged))
        userIdSubscription.unsubscribe()

        expect(isUserLogged).toBeFalsy()
    })
})
