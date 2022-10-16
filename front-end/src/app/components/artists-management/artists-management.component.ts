import { Component, OnInit } from '@angular/core';
import { ApiResponse, Artist } from '../../../../../common/types'
import { NzMessageService } from 'ng-zorro-antd/message'
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

    pageSizeOptions: number[] = [5, 10, 20, 30, 40]
    pageSize: number = 10
    pageIndex: number = 1
    totalArtist: number = 1

    filterText: string = ''

    mentionedArtistsNamesInNews: string[][] = []

    debounceTimer: any

    constructor(
        private message: NzMessageService,
        private store: Store<{ app: AppState }>,
        private router: Router,
        private artistService: ArtistService
    ) {
        this.getArtistPage()
    }

    ngOnInit(): void {}

    getArtistSize() {
        this.artistService.getArtistsSize().subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.totalArtist = res.result as number
            } else {
                this.totalArtist = 1
            }
        })
    }

    updatePageIndex(event: number) {
        this.pageIndex = event

        this.getArtistPage()
    }

    debouncedHTTPRequest() {
        clearTimeout(this.debounceTimer)

        this.debounceTimer = setTimeout(() => {
            this.getArtistPage()
        }, 1000)
    }

    updatePageSize(event: number) {
        this.pageSize = event

        this.getArtistPage()
    }

    getArtistPage() {
        this.tableLoading = true

        this.getArtistSize()

        this.artistService.getPage(this.pageIndex, this.pageSize, this.filterText).subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.artistList = res.result as Artist[]
            } else {
                this.router.navigateByUrl('/error')
            }

            this.tableLoading = false
        })
    }

    findIndexFromArtistList(id: string): number {
        let i: number = 0

        for (; i < this.artistList.length; i++) {
            if (this.artistList[i].id == id) {
                return i
            }
        }

        return i
    }

    onDeleteArtist(id: string): void {
        let find: number = this.findIndexFromArtistList(id)

        if(this.artistList[find].mentions == 0){
            this.artistService.delete(id).subscribe(async (res: ApiResponse) => {
            if (res.status == 200) {
                this.getArtistPage()
                this.store.dispatch(addToArtistCount({ payload: -1 }))

                this.message.create('success', `Artist deleted successfully!`)
            } else {
                this.message.create('error', `Failed to delete the artist!`)
            }
            })
        } else {
            this.message.create('error', `Failed to delete the artist due to a news mentioning him!`)
        }

        
    }

}
