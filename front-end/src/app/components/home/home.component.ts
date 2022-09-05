import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '../../app.store'
import { map, Observable } from 'rxjs'

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
            return state.usersCount as number
        })
    )

    artistCount: Observable<number> = this.store.select('app').pipe(
        map((state: AppState) => {
            return state.artistsCount as number
        })
    )

    isAdmin: Observable<boolean> = this.store.select('app').pipe(
        map((state: AppState) => {
            return (state.user.type == 'Admin') as boolean
        })
    )

    constructor(private store: Store<{ app: AppState }>) {}

    ngOnInit(): void {}
}
