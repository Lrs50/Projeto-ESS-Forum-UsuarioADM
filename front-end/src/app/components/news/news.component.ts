import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'
import { AppState } from 'src/app/app.store'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { ApiResponse, News, User } from '../../../../../common/types'

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
    constructor(private newsManagementService: NewsManagementService, private router: Router, private store: Store<{ app: AppState }>) {}

    newsList: News[] = []

    filterText: string = ''

    radioValue: string = 'Popular'
    pageSize: number = 5
    pageIndex: number = 1
    totalNews: number = 50

    loading: boolean = false
    weHaveNews: boolean = false

    gridStyle = {
        width: '100%',
        cursor: 'default',
        padding: '0.5rem',
        background: '#fefefe',
    }

    isUserLogged: Observable<boolean> = this.store.select('app').pipe(
        map((state: AppState) => {
            return state.logged
        })
    )

    userInfo: Observable<User> = this.store.select('app').pipe(
        map((state: AppState) => {
            return state.user
        })
    )

    debounceTimer: any

    ngOnInit(): void {
        this.getNewsPage()
    }

    debouncedHTTPRequest() {
        clearTimeout(this.debounceTimer)

        this.debounceTimer = setTimeout(() => {
            this.getNewsPage()
        }, 1000)
    }

    getNewsSize() {
        this.newsManagementService.getNewsSize().subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.totalNews = res.result as number
            } else {
                this.totalNews = 0
            }
        })
    }

    updatePageIndex(event: number) {
        this.pageIndex = event

        this.getNewsPage()
    }

    updatePageSize(event: number) {
        this.pageSize = event

        this.getNewsPage()
    }

    getNewsPage() {
        this.loading = true
        this.getNewsSize()

        this.newsManagementService.getPage(this.pageIndex, this.pageSize, this.radioValue, this.filterText).subscribe((res: ApiResponse) => {
            this.newsList = res.result as News[]

            if (this.newsList.length == 0) {
                this.weHaveNews = false
            } else {
                this.newsList = res.result as News[]
                this.weHaveNews = true
            }

            this.loading = false
        })
    }
}
