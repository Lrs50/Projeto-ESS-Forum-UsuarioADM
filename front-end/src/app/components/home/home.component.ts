import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState, addToNewsCount, addToUserCount } from '../../app.store'
import { map, Observable } from 'rxjs'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { ApiResponse } from '../../../../../common/types'
import { UsersService } from 'src/app/services/users.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    newsCount: Observable<number> = this.store.select('app').pipe(
        map((state: AppState) => {
            return state.newsCount as number
        })
    )

    userCount: Observable<number> = this.store.select('app').pipe(
        map((state: AppState) => {
            return state.newsCount as number
        })
    )

    isAdmin: Observable<boolean> = this.store.select('app').pipe(
        map((state) => {
            return (state.user.type == 'Admin') as boolean
        })
    )

    constructor(private store: Store<{ app: AppState }>) {}

    ngOnInit(): void {}
}
