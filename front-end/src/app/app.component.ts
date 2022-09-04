import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, Observable, Subscription, take } from 'rxjs'
import { ApiResponse, User, emptyUser } from '../../../common/types'
import { AppState, changeUserInfo, changeUserLoggedStatus, setNews } from './app.store'
import { NewsManagementService } from './services/news-management.service'
import { imageFallBack } from 'src/util'
import { Router } from '@angular/router'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    imgFall: string = imageFallBack

    title = 'front-end'
    showProfile: boolean = false

    theme: string = 'light'

    logged: Observable<Boolean> = this.store.select('app').pipe(
        map((state) => {
            return state.logged
        })
    )

    userInfo: Observable<User> = this.store.select('app').pipe(
        map((state) => {
            return state.user
        })
    )

    constructor(private store: Store<{ app: AppState }>, private newsManagementService: NewsManagementService, private router: Router) {
        let userJsonStr: string | null = localStorage.getItem('userInfo')

        if (userJsonStr != null) {
            let user: User = JSON.parse(userJsonStr)

            this.store.dispatch(changeUserInfo({ payload: user }))
            this.store.dispatch(changeUserLoggedStatus({ payload: true }))
        }

        this.newsManagementService.getNewsSize().subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.store.dispatch(setNews({ payload: res.result as number }))
            } else {
                this.store.dispatch(setNews({ payload: 0 }))
            }
        })
    }

    ngOnInit() {}

    showProfileDrawer() {
        this.showProfile = true
    }

    hideProfileDrawer() {
        this.showProfile = false
    }

    onLogout() {
        this.store.dispatch(
            changeUserInfo({
                payload: emptyUser(''),
            })
        )
        this.store.dispatch(changeUserLoggedStatus({ payload: false }))
        this.router.navigateByUrl('/home')
    }

    onLogin() {
        this.router.navigateByUrl('/login')
        this.showProfile = false
    }

    onEditProfile() {
        let userId: string = ''

        let userIdSubscription: Subscription = this.userInfo.pipe(take(1)).subscribe((user: User) => (userId = user.id))
        userIdSubscription.unsubscribe()

        this.router.navigateByUrl(`/home/user/${userId}`)
        this.showProfile = false
    }
}
