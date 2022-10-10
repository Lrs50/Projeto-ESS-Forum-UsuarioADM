import { Component, OnInit } from '@angular/core'
import { ApiResponse, Artist, News } from '../../../../../common/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { imageFallBack, ParseDate } from 'src/util'
import { Store } from '@ngrx/store'
import { AppState, addToNewsCount } from 'src/app/app.store'
import { Router } from '@angular/router'
import { ArtistService } from 'src/app/services/artist.service'
import { firstValueFrom } from 'rxjs'

@Component({
    selector: 'app-news-management',
    templateUrl: './news-management.component.html',
    styleUrls: ['./news-management.component.css'],
})
export class NewsManagementComponent implements OnInit {
    imageFall: string = imageFallBack
    newsList: News[] = []

    parseDate = ParseDate

    tableLoading: boolean = false

    pageSizeOptions: number[] = [10, 20, 30, 40]
    pageSize: number = 10
    pageIndex: number = 1
    totalNews: number = 1

    filterText: string = ''

    mentionedArtistsNamesInNews: string[][] = []

    debounceTimer: any

    constructor(
        private message: NzMessageService,
        private newsManagementService: NewsManagementService,
        private store: Store<{ app: AppState }>,
        private router: Router,
        private artistService: ArtistService
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

    debouncedHTTPRequest() {
        clearTimeout(this.debounceTimer)

        this.debounceTimer = setTimeout(() => {
            this.getNewsPage()
        }, 1000)
    }

    updatePageSize(event: number) {
        this.pageSize = event

        this.getNewsPage()
    }

    getNewsPage() {
        this.tableLoading = true

        this.getNewsSize()

        this.newsManagementService.getPage(this.pageIndex, this.pageSize, 'Newest', this.filterText).subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.newsList = res.result as News[]

                for (let i = 0; i < this.newsList.length; i++) {
                    let tempList: string[] = []

                    for (let j = 0; j < this.newsList[i].mention.length; j++) {
                        this.artistService.get(this.newsList[i].mention[j]).subscribe((res: ApiResponse) => {
                            if (res.status == 200) {
                                tempList.push((res.result as Artist).name)
                            } else {
                                this.router.navigateByUrl('/error')
                            }
                        })
                    }

                    this.mentionedArtistsNamesInNews.push(tempList)
                }
            } else {
                this.router.navigateByUrl('/error')
            }

            this.tableLoading = false
        })
    }

    findIndexFromNewsList(id: string): number {
        let i: number = 0

        for (; i < this.newsList.length; i++) {
            if (this.newsList[i].id == id) {
                return i
            }
        }

        return i
    }

    onDeleteNews(id: string): void {
        let find: number = this.findIndexFromNewsList(id)

        this.newsManagementService.delete(id).subscribe(async (res: ApiResponse) => {
            if (res.status == 200) {
                for (let i = 0; i < this.newsList[find].mention.length; i++) {
                    await firstValueFrom(this.artistService.addMention(this.newsList[find].mention[i], -1))
                }

                this.mentionedArtistsNamesInNews.splice(find, 1)
                this.newsList.splice(find, 1)
                this.totalNews -= 1
                this.store.dispatch(addToNewsCount({ payload: -1 }))

                this.message.create('success', `News deleted successfully!`)
            } else {
                this.message.create('error', `Failed to delete the news!`)
            }
        })
    }
}
