import { Component, OnInit } from '@angular/core';
import { ApiResponse, Artist, News } from '../../../../../common/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { imageFallBack } from 'src/util'
import { Store } from '@ngrx/store'
import { AppState, addToArtistCount } from 'src/app/app.store'
import { Router } from '@angular/router'
import { ArtistService } from 'src/app/services/artist.service'

@Component({
  selector: 'app-artists-management',
  templateUrl: './artists-management.component.html',
  styleUrls: ['./artists-management.component.css']
})

export class ArtistsManagementComponent implements OnInit {

    imageFall: string = imageFallBack
    artistList: Artist[] = []

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

        //this.getNewsSize()

        this.artistService.getAll().subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.artistList = res.result as Artist[]

            } else {
                this.artistList = []
            }

            this.tableLoading = false
        })
    }

    findIndexFromFilteredList(id: string): number {
        let i: number = 0

        for (; i < this.artistList.length; i++) {
            if (this.artistList[i].id == id) {
                return i
            }
        }

        return i
    }

    onDeleteArtist(id: string): void {
        this.artistList = this.artistList.filter(a => a.id != id)
        this.artistService.delete(id).subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.store.dispatch(addToArtistCount({ payload: -1 }))
                this.message.create('success', `Artist deleted successfully!`)
            } else {
                this.message.create('error', `Failed to delete the artist!`)
            }
        })
    }

}
