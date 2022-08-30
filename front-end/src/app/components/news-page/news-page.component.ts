import { Component, OnInit } from '@angular/core'
import { News, ApiResponse, User } from '../../../../../common/types'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { ActivatedRoute } from '@angular/router'
import { imageFallBack } from '../../../util'
import { map, Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.store'

@Component({
    selector: 'app-news-page',
    templateUrl: './news-page.component.html',
    styleUrls: ['./news-page.component.css'],
})
export class NewsPageComponent implements OnInit {
    imgFall: string = imageFallBack

    userInfo: Observable<User> = this.store.select('app').pipe(
        map((state: AppState) => {
            return state.user
        })
    )

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

    likes = 0
    dislikes = 0

    commentContent: string = ''

    isAdmin: Observable<boolean> = this.store.select('app').pipe(
        map((state: AppState) => {
            return (state.user.type == 'admin') as boolean
        })
    )

    constructor(private newsManagementService: NewsManagementService, private route: ActivatedRoute, private store: Store<{ app: AppState }>) {
        const id: string | null = this.route.snapshot.paramMap.get('id')

        if (id != null) {
            this.newsManagementService.get(id).subscribe((res: ApiResponse) => {
                if (res.status == 200) {
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

    like(): void {
        this.likes = 1
        this.dislikes = 0
    }

    dislike(): void {
        this.likes = 0
        this.dislikes = 1
    }
}
