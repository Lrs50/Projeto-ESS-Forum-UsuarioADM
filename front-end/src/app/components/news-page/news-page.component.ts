import { Component, OnInit } from '@angular/core'
import { News, ApiResponse, User, Like, Comment, emptyUser, emptyNews, Artist } from '../../../../../common/types'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { ActivatedRoute, Router } from '@angular/router'
import { imageFallBack, ParseDate } from '../../../util'
import { firstValueFrom, map, Observable, Subscription, take } from 'rxjs'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.store'
import { NzMessageService } from 'ng-zorro-antd/message'
import { UsersService } from 'src/app/services/users.service'
import { nanoid } from 'nanoid'
import { ArtistService } from 'src/app/services/artist.service'

@Component({
    selector: 'app-news-page',
    templateUrl: './news-page.component.html',
    styleUrls: ['./news-page.component.css'],
})
export class NewsPageComponent implements OnInit {
    imgFall: string = imageFallBack
    parseDate = ParseDate

    hasUserLikedTheNews: boolean = false

    userInfo: Observable<User> = this.store.select('app').pipe(
        map((state: AppState) => {
            return state.user
        })
    )

    news: News = emptyNews('', '')

    authorInfo: User = emptyUser('')

    commentContent: string = ''
    hasUserLikedIComment: boolean[] = []
    hasUserDislikedIComment: boolean[] = []

    mentionedArtistsName: string[] = []

    readingTime: number = 0

    isAdmin: Observable<boolean> = this.store.select('app').pipe(
        map((state: AppState) => {
            return (state.user.type == 'Admin') as boolean
        })
    )

    isUserLogged: Observable<boolean> = this.store.select('app').pipe(
        map((state: AppState) => {
            return state.logged
        })
    )

    constructor(
        private newsManagementService: NewsManagementService,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<{ app: AppState }>,
        private message: NzMessageService,
        private userService: UsersService,
        private artistService: ArtistService
    ) {
        const id: string | null = this.route.snapshot.paramMap.get('id')

        if (id != null) {
            this.newsManagementService.get(id).subscribe(async (res: ApiResponse) => {
                if (res.status == 200) {
                    this.news = res.result as News

                    this.news.views += 1

                    this.readingTime = Math.ceil(this.news.markdownText.split(' ').length / 200)

                    this.newsManagementService.addView(id).subscribe(() => {
                        return
                    })

                    this.userService.get(this.news.authorId).subscribe((res: ApiResponse) => {
                        if (res.status == 200) {
                            this.authorInfo = res.result as User
                        } else {
                            this.router.navigateByUrl('/error')
                        }
                    })

                    let userId: string = (await firstValueFrom(this.userInfo)).id

                    for (let i = 0; i < this.news.likes.length; i++) {
                        if (this.news.likes[i] == userId) {
                            this.hasUserLikedTheNews = true
                            break
                        }
                    }

                    for (let i = 0; i < this.news.comments.length; i++) {
                        for (let j = 0; j < this.news.comments[i].likes.length; j++) {
                            if (this.news.comments[i].likes[j] == userId) {
                                this.hasUserLikedIComment.push(true)
                            } else {
                                this.hasUserLikedIComment.push(false)
                            }
                        }

                        for (let j = 0; j < this.news.comments[i].dislikes.length; j++) {
                            if (this.news.comments[i].dislikes[j] == userId) {
                                this.hasUserDislikedIComment.push(true)
                            } else {
                                this.hasUserDislikedIComment.push(false)
                            }
                        }
                    }

                    for (let i = 0; i < this.news.mention.length; i++) {
                        this.artistService.get(this.news.mention[i]).subscribe((res: ApiResponse) => {
                            if (res.status == 200) {
                                this.mentionedArtistsName.push((res.result as Artist).name)
                            } else {
                                this.router.navigateByUrl('/error')
                            }
                        })
                    }
                } else {
                    this.router.navigateByUrl('/notfound')
                }
            })
        } else {
            this.router.navigateByUrl('/notfound')
        }
    }

    ngOnInit(): void {}

    async toggleLikeNews(): Promise<void> {
        let userId: string = (await firstValueFrom(this.userInfo)).id

        if (userId == '') {
            this.message.create('warning', `Please login first`)
            return
        }

        let liked: boolean = false

        for (var i = 0; i < this.news.likes.length; i++) {
            if (this.news.likes[i] == userId) {
                liked = true
                break
            }
        }

        if (liked) {
            this.hasUserLikedTheNews = false

            this.newsManagementService.removeLike(this.news.id, userId).subscribe(async (res: ApiResponse) => {
                if (res.status != 200) {
                    this.message.create('error', `Something went wrong!`)
                } else {
                    for (var i = 0; i < this.news.likes.length; i++) {
                        if (this.news.likes[i] == userId) {
                            this.news.likes.splice(i, 1)
                            break
                        }
                    }
                }

                await firstValueFrom(this.newsManagementService.updateLastActivity(this.news.id))
            })
        } else {
            this.hasUserLikedTheNews = true

            this.newsManagementService.addLike(this.news.id, userId).subscribe(async (res: ApiResponse) => {
                if (res.status != 200) {
                    this.message.create('error', `Something went wrong!`)
                } else {
                    this.news.likes.push(userId)
                }

                await firstValueFrom(this.newsManagementService.updateLastActivity(this.news.id))
            })
        }
    }

    addComment(): void {
        this.userInfo.pipe(take(1)).subscribe((user: User) => {
            let temp: Comment = {
                id: nanoid(),
                authorInfo: {
                    avatar: user.avatar,
                    name: user.name,
                    id: user.id,
                },
                content: this.commentContent,
                likes: [],
                dislikes: [],
            }

            this.newsManagementService.addComment(this.news.id, temp).subscribe(async (res: ApiResponse) => {
                if (res.status == 200) {
                    this.news.comments.unshift(temp)
                    this.commentContent = ''
                    this.message.create('success', `Comment added!`)

                    await firstValueFrom(this.newsManagementService.updateLastActivity(this.news.id))
                } else {
                    this.message.create('error', `Something went wrong!`)
                }
            })
        })
    }

    removeComment(id: string): void {
        this.newsManagementService.removeComment(this.news.id, id).subscribe(async (res: ApiResponse) => {
            if (res.status == 200) {
                for (let i = 0; i < this.news.comments.length; i++) {
                    if (this.news.comments[i].id == id) {
                        this.news.comments.splice(i, 1)
                        break
                    }
                }

                await firstValueFrom(this.newsManagementService.updateLastActivity(this.news.id))

                this.message.create('success', `Comment removed!`)
            } else {
                this.message.create('error', `Something went wrong!`)
            }
        })
    }

    async toggleLikeComment(commentIndex: number): Promise<void> {
        let userId: string = (await firstValueFrom(this.userInfo)).id

        if (userId == '') {
            this.message.create('warning', `Please login first`)
            return
        }

        let liked: boolean = false
        let findIndex = -1

        for (var i = 0; i < this.news.comments[commentIndex].likes.length; i++) {
            if (this.news.comments[commentIndex].likes[i] == userId) {
                liked = true
                findIndex = i
                break
            }
        }

        if (liked) {
            this.hasUserLikedIComment[commentIndex] = false

            this.newsManagementService
                .removeLikeInComment(this.news.id, this.news.comments[commentIndex].id, userId)
                .subscribe(async (res: ApiResponse) => {
                    if (res.status != 200) {
                        this.message.create('error', `Something went wrong!`)
                    } else {
                        await firstValueFrom(this.newsManagementService.updateLastActivity(this.news.id))
                        this.news.comments[commentIndex].likes.splice(findIndex, 1)
                    }
                })
        } else {
            if (this.hasUserDislikedIComment[commentIndex] == true) {
                this.toggleDislikeComment(commentIndex)
            }

            this.hasUserLikedIComment[commentIndex] = true

            this.newsManagementService
                .addLikeInComment(this.news.id, this.news.comments[commentIndex].id, userId)
                .subscribe(async (res: ApiResponse) => {
                    if (res.status != 200) {
                        this.message.create('error', `Something went wrong!`)
                    } else {
                        await firstValueFrom(this.newsManagementService.updateLastActivity(this.news.id))
                        this.news.comments[commentIndex].likes.push(userId)
                    }
                })
        }
    }

    async toggleDislikeComment(commentIndex: number): Promise<void> {
        let userId: string = (await firstValueFrom(this.userInfo)).id

        if (userId == '') {
            this.message.create('warning', `Please login first`)
            return
        }

        let disliked: boolean = false
        let findIndex = -1

        for (var i = 0; i < this.news.comments[commentIndex].dislikes.length; i++) {
            if (this.news.comments[commentIndex].dislikes[i] == userId) {
                disliked = true
                findIndex = i
                break
            }
        }

        if (disliked) {
            this.hasUserDislikedIComment[commentIndex] = false

            this.newsManagementService
                .removeDislikeInComment(this.news.id, this.news.comments[commentIndex].id, userId)
                .subscribe(async (res: ApiResponse) => {
                    if (res.status != 200) {
                        this.message.create('error', `Something went wrong!`)
                    } else {
                        this.news.comments[commentIndex].dislikes.splice(findIndex, 1)
                        await firstValueFrom(this.newsManagementService.updateLastActivity(this.news.id))
                    }
                })
        } else {
            if (this.hasUserLikedIComment[commentIndex] == true) {
                this.toggleLikeComment(commentIndex)
            }

            this.hasUserDislikedIComment[commentIndex] = true

            this.newsManagementService
                .addDislikeInComment(this.news.id, this.news.comments[commentIndex].id, userId)
                .subscribe(async (res: ApiResponse) => {
                    if (res.status != 200) {
                        this.message.create('error', `Something went wrong!`)
                    } else {
                        this.news.comments[commentIndex].dislikes.push(userId)
                        await firstValueFrom(this.newsManagementService.updateLastActivity(this.news.id))
                    }
                })
        }
    }
}
