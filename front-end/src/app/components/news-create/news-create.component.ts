import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { nanoid } from 'nanoid'
import { NzStatus } from 'ng-zorro-antd/core/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { AppState, incrementNews } from 'src/app/app.store'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { ApiResponse, News } from '../../../../../common/types'
import { defaultTags, imageFallBack } from 'src/util'

@Component({
    selector: 'app-news-create',
    templateUrl: './news-create.component.html',
    styleUrls: ['./news-create.component.css'],
})
export class NewsCreateComponent implements OnInit {
    avaliableTags: string[] = defaultTags
    imgFall: string = imageFallBack

    statusInputTitle: 'secondary' | 'warning' | 'danger' | 'success' | undefined = undefined
    statusInputContent: NzStatus = ''

    news: News = {
        id: '',
        cover: '',
        authorId: '',
        title: 'Change the title!',
        date: '',
        markdownText: '',
        edited: false,
        views: 0,
        likes: [],
        comments: [],
        tags: [],
    }

    constructor(
        private newsManagementService: NewsManagementService,
        private message: NzMessageService,
        private router: Router,
        private store: Store<{ app: AppState }>
    ) {}

    ngOnInit(): void {}

    validateEditInfo(): boolean {
        var result: boolean = true

        this.statusInputTitle = undefined
        this.statusInputContent = ''

        if (this.news.title == '') {
            this.statusInputTitle = 'danger'
            result = false
        }

        if (this.news.markdownText == '') {
            this.statusInputContent = 'error'
            result = false
        }

        return result
    }

    onCreateNews(): void {
        var result: boolean = this.validateEditInfo()

        if (result == false) {
            this.message.create('error', `Please make sure that Title and Content are not empty!`)
            return
        }

        let currentDate = new Date()

        let date = currentDate.toLocaleDateString()
        let hour = currentDate.toLocaleTimeString()

        let temp: News = {
            ...this.news,
            id: nanoid(),
            date: date + ' ' + hour.slice(0, -3),
        }

        this.newsManagementService.create(temp).subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.message.create('success', `New news created successfully!`)
                this.store.dispatch(incrementNews())
                this.router.navigateByUrl('/home/news/' + temp.id)
            } else {
                this.message.create('error', `Failed to create the news!`)
            }
        })
    }
}
