import { Component, OnInit } from '@angular/core'
import { ApiResponse, News } from '../../../../../common/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { imageFallBack } from 'src/util'
import { Store } from '@ngrx/store'
import { AppState, addToNewsCount } from 'src/app/app.store'
import { Router } from '@angular/router'

@Component({
    selector: 'app-news-management',
    templateUrl: './news-management.component.html',
    styleUrls: ['./news-management.component.css'],
})
export class NewsManagementComponent implements OnInit {
    imageFall: string = imageFallBack
    newsList: News[] = []
    newsListFiltered: News[] = []
    tableLoading: boolean = false

    pageSizeOptions: number[] = [10, 20, 30, 40]
    pageSize: number = 10
    pageIndex: number = 1
    totalNews: number = 1

    filterText: string = ''

    constructor(
        private message: NzMessageService,
        private newsManagementService: NewsManagementService,
        private store: Store<{ app: AppState }>,
        private router: Router
    ) {
        this.getNewsPage()
    }

    ngOnInit(): void {}

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
        this.tableLoading = true

        this.getNewsSize()

        this.newsManagementService.getPage(this.pageIndex, this.pageSize).subscribe((res: ApiResponse) => {
            if (res.status == 200 || res.status == 404) {
                this.newsList = res.result as News[]

                this.clearFilter()
            } else {
                this.router.navigateByUrl('/error')
            }

            this.tableLoading = false
        })
    }

    findIndexFromFilteredList(id: string): number {
        let i: number = 0

        for (; i < this.newsList.length; i++) {
            if (this.newsList[i].id == id) {
                return i
            }
        }

        return i
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

    private clearFilter() {
        this.filterText = ''
        this.newsListFiltered = this.newsList
    }

    onDeleteNews(id: string): void {
        let find: number = this.findIndexFromFilteredList(id)

        this.newsManagementService.delete(id).subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.newsList.splice(find, 1)
                this.clearFilter()
                this.totalNews -= 1
                this.store.dispatch(addToNewsCount({ payload: -1 }))
                this.message.create('success', `News deleted successfully!`)
            } else {
                this.message.create('error', `Failed to delete the news!`)
            }
        })
    }
}
