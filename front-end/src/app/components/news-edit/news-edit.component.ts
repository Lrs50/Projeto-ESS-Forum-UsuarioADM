import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NzStatus } from 'ng-zorro-antd/core/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { ApiResponse, News, User, emptyUser } from '../../../../../common/types'
import { defaultTags } from 'src/util'
import { imageFallBack } from 'src/util'
import { map, Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.store'
import { UsersService } from 'src/app/services/users.service'

@Component({
    selector: 'app-news-edit',
    templateUrl: './news-edit.component.html',
    styleUrls: ['./news-edit.component.css'],
})
export class NewsEditComponent implements OnInit {
    imgFall: string = imageFallBack

    avaliableTags: string[] = defaultTags

    statusInputTitle: 'secondary' | 'warning' | 'danger' | 'success' | undefined = undefined
    statusInputDescription: 'secondary' | 'warning' | 'danger' | 'success' | undefined = undefined
    statusInputContent: NzStatus = ''

    news: News = {
        id: '',
        cover: '',
        authorId: '',
        title: '',
        description: '',
        date: '',
        markdownText: '',
        edited: false,
        views: 0,
        likes: [],
        comments: [],
        tags: [],
    }

    authorInfo: User = emptyUser('')

    constructor(
        private newsManagementService: NewsManagementService,
        private route: ActivatedRoute,
        private message: NzMessageService,
        private userService: UsersService
    ) {
        const id: string | null = this.route.snapshot.paramMap.get('id')

        if (id != null) {
            this.newsManagementService.get(id).subscribe((res: ApiResponse) => {
                if (res.status == 200) {
                    this.news = res.result as News

                    this.userService.get(this.news.authorId).subscribe((res: ApiResponse) => {
                        if (res.status == 200) {
                            this.authorInfo = res.result as User
                        } else {
                            this.message.create('error', `Something went wrong!`)
                        }
                    })
                } else {
                    this.news = {
                        id: '',
                        cover: '',
                        authorId: '',
                        title: '',
                        description: '',
                        date: '',
                        markdownText: '',
                        edited: false,
                        views: 0,
                        likes: [],
                        comments: [],
                        tags: [],
                    }
                }
            })
        }
    }

    ngOnInit(): void {}

    validateEditInfo(): boolean {
        var result: boolean = true

        this.statusInputTitle = undefined
        this.statusInputDescription = undefined
        this.statusInputContent = ''

        if (this.news.title == '') {
            this.statusInputTitle = 'danger'
            result = false
        }

        if (this.news.markdownText == '') {
            this.statusInputContent = 'error'
            result = false
        }

        if (this.news.description == '') {
            this.statusInputDescription = 'danger'
            result = false
        }

        return result
    }

    onSaveNews(): void {
        if (this.validateEditInfo() == false) {
            this.message.create('error', `Please make sure that Title, Content and Description are not empty!`)
            return
        }

        let currentDate = new Date()
        let date = currentDate.toLocaleDateString()
        let hour = currentDate.toLocaleTimeString()

        this.news.date = date + ' ' + hour.slice(0, -3)
        this.news.edited = true

        this.newsManagementService.edit(this.news).subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.message.create('success', `Saved!`)
            } else {
                this.message.create('error', `Failed to save the news!`)
            }
        })
    }
}
