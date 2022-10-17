import { Component, OnInit } from '@angular/core'
import { ApiResponse, Artist, News, User } from '../../../../../common/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { imageFallBack, ParseDate } from 'src/util'
import { Store } from '@ngrx/store'
import { AppState, addToNewsCount } from 'src/app/app.store'
import { Router } from '@angular/router'
import { ArtistService } from 'src/app/services/artist.service'
import { firstValueFrom } from 'rxjs'
import { UsersService } from 'src/app/services/users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    imageFall: string = imageFallBack
    usersList: User[] = []

    parseDate = ParseDate

    tableLoading: boolean = false

    pageSizeOptions: number[] = [10, 20, 30, 40]
    pageSize: number = 10
    pageIndex: number = 1
    totalUsers: number = 1

    filterText: string = ''

    debounceTimer: any

    constructor(
        private message: NzMessageService,
        public usersService: UsersService,
        private store: Store<{ app: AppState }>,
        private router: Router,
        private artistService: ArtistService
    ) {
        this.getNewsPage()
    }

    ngOnInit(): void {}

    getNewsSize() {
        this.usersService.getUsersSize().subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.totalUsers = res.result as number
            } else {
                this.totalUsers = 1
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

    async getNewsPage() {
        this.tableLoading = true

        this.getNewsSize()

        let response: ApiResponse = await firstValueFrom(this.usersService.getPage(this.pageIndex, this.pageSize, this.filterText))

        if (response.status == 200) {
            this.usersList = response.result as User[]
        } else {
            this.router.navigateByUrl('/error')
        }

        this.tableLoading = false
    }

    findIndexFromNewsList(id: string): number {
        let i: number = 0

        for (; i < this.usersList.length; i++) {
            if (this.usersList[i].id == id) {
                return i
            }
        }

        return i
    }
}
