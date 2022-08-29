import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'
import { ApiResponse, User } from '../../../common/types'
import { AppState, setNews } from './app.store'
import { NewsManagementService } from './services/news-management.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'front-end'
    showProfile: boolean = false

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

    constructor(private store: Store<{ app: AppState }>, private newsManagementService: NewsManagementService) {
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
}
