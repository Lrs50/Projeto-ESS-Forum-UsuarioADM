import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NzStatus } from 'ng-zorro-antd/core/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { ApiResponse, News, User, emptyUser, emptyNews, Artist, defaultTags } from '../../../../../common/types'
import { imageFallBack } from 'src/util'
import { UsersService } from 'src/app/services/users.service'
import { ArtistService } from 'src/app/services/artist.service'
import { firstValueFrom } from 'rxjs'

@Component({
    selector: 'app-news-edit',
    templateUrl: './news-edit.component.html',
    styleUrls: ['./news-edit.component.css'],
})
export class NewsEditComponent implements OnInit {
    imgFall: string = imageFallBack

    statusInputTitle: 'secondary' | 'warning' | 'danger' | 'success' | undefined = undefined
    statusInputDescription: 'secondary' | 'warning' | 'danger' | 'success' | undefined = undefined
    statusInputContent: NzStatus = ''

    news: News = emptyNews('', '')

    authorInfo: User = emptyUser('')

    artists: Artist[] = []
    artistsNames: string[] = []

    artistsBackup: string[] = []

    avaliableTags: string[] = [...defaultTags]

    constructor(
        private newsManagementService: NewsManagementService,
        private route: ActivatedRoute,
        private message: NzMessageService,
        private userService: UsersService,
        private router: Router,
        private artistService: ArtistService
    ) {
        const id: string | null = this.route.snapshot.paramMap.get('id')

        if (id != null) {
            this.newsManagementService.get(id).subscribe((res: ApiResponse) => {
                if (res.status == 200) {
                    this.news = res.result as News
                    this.artistsBackup = (res.result as News).mention

                    this.userService.get(this.news.authorId).subscribe((res: ApiResponse) => {
                        if (res.status == 200) {
                            this.authorInfo = res.result as User
                        } else {
                            this.router.navigateByUrl('/error')
                        }
                    })
                } else {
                    this.router.navigateByUrl('/notfound')
                }
            })

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

        this.news.date = +new Date()
        this.news.edited = true

        this.newsManagementService.edit(this.news).subscribe(async (res: ApiResponse) => {
            if (res.status == 200) {
                for (let i = 0; i < this.artistsBackup.length; i++) {
                    if (this.news.mention.includes(this.artistsBackup[i]) == false) {
                        await firstValueFrom(this.artistService.addMention(this.artistsBackup[i], -1))
                    }
                }

                for (let i = 0; i < this.news.mention.length; i++) {
                    if (this.artistsBackup.includes(this.news.mention[i]) == false) {
                        await firstValueFrom(this.artistService.addMention(this.news.mention[i], 1))
                    }
                }

                this.message.create('success', `Saved!`)
            } else {
                this.message.create('error', `Failed to save the news!`)
                this.router.navigateByUrl('/error')
            }
        })
    }
}
