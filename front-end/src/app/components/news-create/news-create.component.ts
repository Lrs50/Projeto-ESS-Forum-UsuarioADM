import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { nanoid } from 'nanoid'
import { NzStatus } from 'ng-zorro-antd/core/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { AppState } from 'src/app/app.store'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { ApiResponse, Artist, emptyNews, News, User, defaultTags } from '../../../../../common/types'
import { imageFallBack } from 'src/util'
import { first, firstValueFrom, map, Observable, Subscription, take } from 'rxjs'
import { addToNewsCount } from '../../app.store'
import { ArtistService } from 'src/app/services/artist.service'

@Component({
    selector: 'app-news-create',
    templateUrl: './news-create.component.html',
    styleUrls: ['./news-create.component.css'],
})
export class NewsCreateComponent implements OnInit {
    imgFall: string = imageFallBack

    statusInputTitle: 'secondary' | 'warning' | 'danger' | 'success' | undefined = undefined
    statusInputContent: NzStatus = ''
    statusInputDescription: 'secondary' | 'warning' | 'danger' | 'success' | undefined = undefined

    news: News = emptyNews('', '')

    userInfo: Observable<User> = this.store.select('app').pipe(
        map((state: AppState) => {
            return state.user
        })
    )

    artists: Artist[] = []
    artistsNames: string[] = []

    avaliableTags: string[] = [...defaultTags]

    constructor(
        private newsManagementService: NewsManagementService,
        private message: NzMessageService,
        private router: Router,
        private store: Store<{ app: AppState }>,
        private artistService: ArtistService
    ) {
        this.artistService.getAll().subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.artists = res.result as Artist[]

                for (let i = 0; i < this.artists.length; i++) {
                    this.artistsNames.push(this.artists[i].name)
                }
            } else {
                this.router.navigateByUrl('/error')
            }
        })
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

    async onCreateNews(): Promise<void> {
        var result: boolean = this.validateEditInfo()

        if (result == false) {
            this.message.create('error', `Please make sure that Title, Content and Description are not empty!`)
            return
        }

        let authorId: string = (await firstValueFrom(this.userInfo)).id

        let temp: News = {
            ...this.news,
            id: nanoid(),
            authorId: authorId,
            date: +new Date(),
            lastActivity: +new Date(),
        }

        for (let i = 0; i < this.news.mention.length; i++) {
            await firstValueFrom(this.artistService.addMention(this.news.mention[i], 1))
        }

        this.newsManagementService.create(temp).subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.message.create('success', `New news created successfully!`)
                this.store.dispatch(addToNewsCount({ payload: 1 }))
                this.router.navigateByUrl('/home/news/' + temp.id)
            } else {
                this.message.create('error', `Failed to create the news!`)
                this.router.navigateByUrl('/error')
            }
        })
    }
}
