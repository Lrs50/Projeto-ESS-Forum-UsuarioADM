import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState, setNews } from '../../app.store'
import { map, Observable } from 'rxjs'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { ApiResponse } from '../../../../../common/types'

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

    isAdmin: Observable<boolean> = this.store.select('app').pipe(
        map((state) => {
            return (state.user.type == 'admin') as boolean
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

    ngOnInit(): void {}
}
