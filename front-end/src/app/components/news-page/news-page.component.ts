import { Component, OnInit } from '@angular/core'
import { News, ApiResponse, User, Like } from '../../../../../common/types'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { ActivatedRoute } from '@angular/router'
import { imageFallBack } from '../../../util'
import { map, Observable, Subscription, take } from 'rxjs'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.store'

@Component({
    selector: 'app-news-page',
    templateUrl: './news-page.component.html',
    styleUrls: ['./news-page.component.css'],
})
export class NewsPageComponent implements OnInit {
    imgFall: string = imageFallBack

    hasUserLikedTheNews: boolean = false

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

    toggleLike(): void {
        let userId: string = ''

        let userIdSubscription: Subscription = this.userInfo.pipe(take(1)).subscribe((user: User) => (userId = user.id))
        userIdSubscription.unsubscribe()

        let liked: boolean = false

        for (var i = 0; i < this.news.likes.length; i++) {
            if (this.news.likes[i].authorId == userId) {
                liked = true
                break
            }
        }

        if (liked) {
            this.hasUserLikedTheNews = false

            for (var i = 0; i < this.news.likes.length; i++) {
                if (this.news.likes[i].authorId == userId) {
                    this.news.likes.splice(i, 1)
                    break
                }
            }

            // add http request
        } else {
            this.hasUserLikedTheNews = true
            this.news.likes.push({ authorId: userId } as Like)

            // add http request
        }
    }
}
