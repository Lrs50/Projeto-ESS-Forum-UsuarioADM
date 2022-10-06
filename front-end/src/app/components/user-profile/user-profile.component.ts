import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { nanoid } from 'nanoid'
import { NzMessageService } from 'ng-zorro-antd/message'
import { map, Observable, take } from 'rxjs'
import { AppState, changeUserInfo, changeUserLoggedStatus } from 'src/app/app.store'
import { UsersService } from 'src/app/services/users.service'
import { imageFallBack } from 'src/util'
import { ApiResponse, emptyUser, User, Comment } from '../../../../../common/types'

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
    imgFall: string = imageFallBack

    loading: boolean = false

    user: User = emptyUser('')

    userInfo: Observable<User> = this.store.select('app').pipe(
        map((state: AppState) => {
            return state.user
        })
    )

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

    commentContent: string = ''

    constructor(
        private store: Store<{ app: AppState }>,
        private route: ActivatedRoute,
        private userService: UsersService,
        private router: Router,
        private message: NzMessageService
    ) {
        const userId: string | null = this.route.snapshot.paramMap.get('id')

        if (userId != null) {
            this.loading = true
            this.userService.get(userId).subscribe((res: ApiResponse) => {
                if (res.status == 200) {
                    this.user = res.result as User
                } else {
                    this.router.navigateByUrl('/notfound')
                }

                this.loading = false
            })
        } else {
            this.router.navigateByUrl('/notfound')
        }
    }

    ngOnInit(): void {}

    onLogout() {
        this.store.dispatch(
            changeUserInfo({
                payload: emptyUser(''),
            })
        )
        this.store.dispatch(changeUserLoggedStatus({ payload: false }))
        this.router.navigateByUrl('/home')
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

            this.userService.addComment(this.user.id, temp).subscribe((res: ApiResponse) => {
                if (res.status == 200) {
                    this.user.profileComments.unshift(temp)
                    this.commentContent = ''
                    this.message.create('success', `Comment added!`)
                } else {
                    this.message.create('error', `Something went wrong!`)
                }
            })
        })
    }

    removeComment(id: string): void {
        this.userService.removeComment(this.user.id, id).subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                for (let i = 0; i < this.user.profileComments.length; i++) {
                    if (this.user.profileComments[i].id == id) {
                        this.user.profileComments.splice(i, 1)
                        break
                    }
                }

                this.message.create('success', `Comment removed!`)
            } else {
                this.message.create('error', `Something went wrong!`)
            }
        })
    }
}
