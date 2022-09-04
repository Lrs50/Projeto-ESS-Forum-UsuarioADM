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
    newsListFiltered: News[] = []

    filterText: string = ''

    radioValue: string = 'P'
    pageSize: number = 5
    pageIndex: number = 1
    totalNews: number = 50

    loading: boolean = false
    weHaveNews: boolean = false

    gridStyle = {
        width: '100%',
        cursor: 'default',
        padding: '0.5rem',
        background: '#f0f0f0',
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

    ngOnInit(): void {
        this.getNewsPage()
    }

    private clearFilter() {
        this.filterText = ''
        this.newsListFiltered = this.newsList
    }

    getNewsSize() {
        this.newsManagementService.getNewsSize().subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.totalNews = res.result as number
            } else {
                this.totalNews = 1
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

        this.newsManagementService.getPage(this.pageIndex, this.pageSize).subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.newsList = res.result as News[]
                this.weHaveNews = true
                this.clearFilter()
                this.loading = false
            } else {
                this.weHaveNews = false
                this.loading = false
                this.router.navigateByUrl('/error')
            }
        })
    }

    filterNews(): void {
        const value: string = this.filterText.toLowerCase()

        if (value == '') {
            this.newsListFiltered = this.newsList

            return
        }

        this.newsListFiltered = []

        for (var i = 0; i < this.newsList.length; i++) {
            var titleLower = this.newsList[i].title.toLowerCase()
            var markdownLower = this.newsList[i].markdownText.toLowerCase()

            if (titleLower.includes(value) || markdownLower.includes(value)) {
                this.newsListFiltered.push(this.newsList[i])
            }
        }
    }
}
