import { Component, OnInit } from '@angular/core'
import { News, ApiResponse, User, Like, Comment, emptyUser } from '../../../../../common/types'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { ActivatedRoute, Router } from '@angular/router'
import { imageFallBack } from '../../../util'
import { map, Observable, Subscription, take } from 'rxjs'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.store'
import { NzMessageService } from 'ng-zorro-antd/message'
import { UsersService } from 'src/app/services/users.service'
import { nanoid } from 'nanoid'

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

    commentContent: string = ''
    hasUserLikedIComment: boolean[] = []
    hasUserDislikedIComment: boolean[] = []

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
        private userService: UsersService
    ) {
        const id: string | null = this.route.snapshot.paramMap.get('id')

        if (id != null) {
            this.newsManagementService.get(id).subscribe((res: ApiResponse) => {
                if (res.status == 200) {
                    this.news = res.result as News

                    this.news.views += 1

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

                    let userId: string = ''

                    let userIdSubscription: Subscription = this.userInfo.pipe(take(1)).subscribe((user: User) => (userId = user.id))
                    userIdSubscription.unsubscribe()

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
                    }

                    for (let i = 0; i < this.news.comments.length; i++) {
                        for (let j = 0; j < this.news.comments[i].dislikes.length; j++) {
                            if (this.news.comments[i].dislikes[j] == userId) {
                                this.hasUserDislikedIComment.push(true)
                            } else {
                                this.hasUserDislikedIComment.push(false)
                            }
                        }
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

    toggleLikeNews(): void {
        let userId: string = ''

        let userIdSubscription: Subscription = this.userInfo.pipe(take(1)).subscribe((user: User) => (userId = user.id))
        userIdSubscription.unsubscribe()

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

            this.newsManagementService.removeLike(this.news.id, userId).subscribe((res: ApiResponse) => {
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
            })
        } else {
            this.hasUserLikedTheNews = true

            this.newsManagementService.addLike(this.news.id, userId).subscribe((res: ApiResponse) => {
                if (res.status != 200) {
                    this.message.create('error', `Something went wrong!`)
                } else {
                    this.news.likes.push(userId)
                }
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

            this.newsManagementService.addComment(this.news.id, temp).subscribe((res: ApiResponse) => {
                console.log(res)
                if (res.status == 200) {
                    this.news.comments.unshift(temp)
                    this.commentContent = ''
                    this.message.create('success', `Comment added!`)
                } else {
                    this.message.create('error', `Something went wrong!`)
                }
            })
        })
    }

    removeComment(id: string): void {
        this.newsManagementService.removeComment(this.news.id, id).subscribe((res: ApiResponse) => {
            console.log(res)
            if (res.status == 200) {
                for (let i = 0; i < this.news.comments.length; i++) {
                    if (this.news.comments[i].id == id) {
                        this.news.comments.splice(i, 1)
                        break
                    }
                }

                this.message.create('success', `Comment removed!`)
            } else {
                this.message.create('error', `Something went wrong!`)
            }
        })
    }

    toggleLikeComment(commentIndex: number) {
        let userId: string = ''

        let userIdSubscription: Subscription = this.userInfo.pipe(take(1)).subscribe((user: User) => (userId = user.id))
        userIdSubscription.unsubscribe()

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
                .subscribe((res: ApiResponse) => {
                    if (res.status != 200) {
                        this.message.create('error', `Something went wrong!`)
                    } else {
                        this.news.comments[commentIndex].likes.splice(findIndex, 1)
                    }
                })
        } else {
            if (this.hasUserDislikedIComment[commentIndex] == true) {
                this.toggleDislikeComment(commentIndex)
            }

            this.hasUserLikedIComment[commentIndex] = true

            this.newsManagementService.addLikeInComment(this.news.id, this.news.comments[commentIndex].id, userId).subscribe((res: ApiResponse) => {
                if (res.status != 200) {
                    this.message.create('error', `Something went wrong!`)
                } else {
                    this.news.comments[commentIndex].likes.push(userId)
                }
            })
        }
    }

    toggleDislikeComment(commentIndex: number) {
        let userId: string = ''

        let userIdSubscription: Subscription = this.userInfo.pipe(take(1)).subscribe((user: User) => (userId = user.id))
        userIdSubscription.unsubscribe()

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
                .subscribe((res: ApiResponse) => {
                    if (res.status != 200) {
                        this.message.create('error', `Something went wrong!`)
                    } else {
                        this.news.comments[commentIndex].dislikes.splice(findIndex, 1)
                    }
                })
        } else {
            if (this.hasUserLikedIComment[commentIndex] == true) {
                this.toggleLikeComment(commentIndex)
            }

            this.hasUserDislikedIComment[commentIndex] = true

            this.newsManagementService
                .addDislikeInComment(this.news.id, this.news.comments[commentIndex].id, userId)
                .subscribe((res: ApiResponse) => {
                    if (res.status != 200) {
                        this.message.create('error', `Something went wrong!`)
                    } else {
                        this.news.comments[commentIndex].dislikes.push(userId)
                    }
                })
        }
    }
}
