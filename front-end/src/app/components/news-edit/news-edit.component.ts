import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NzStatus } from 'ng-zorro-antd/core/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { ApiResponse, News } from '../../../../../common/types'
import { defaultTags } from 'src/util'
import { imageFallBack } from 'src/util'

@Component({
    selector: 'app-news-edit',
    templateUrl: './news-edit.component.html',
    styleUrls: ['./news-edit.component.css'],
})
export class NewsEditComponent implements OnInit {
    imgFall: string = imageFallBack

    avaliableTags: string[] = defaultTags

    statusInputTitle: 'secondary' | 'warning' | 'danger' | 'success' | undefined = undefined
    statusInputContent: NzStatus = ''

    news: News = {
        id: '',
        cover: '',
        authorId: '',
        title: '',
        date: '',
        markdownText: '',
        edited: false,
        views: 0,
        likes: [],
        comments: [],
        tags: [],
    }

    constructor(private newsManagementService: NewsManagementService, private route: ActivatedRoute, private message: NzMessageService) {
        const id: string | null = this.route.snapshot.paramMap.get('id')

        if (id != null) {
            this.newsManagementService.get(id).subscribe((res: ApiResponse) => {
                if (res.status == 200) {
                    console.log(res)
                    this.news = res.result as News
                } else {
                    this.news = {
                        id: '',
                        cover: '',
                        authorId: '',
                        title: '',
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

    onSaveNews(): void {
        if (this.validateEditInfo() == false) {
            this.message.create('error', `Please check the fields before save!`)
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
