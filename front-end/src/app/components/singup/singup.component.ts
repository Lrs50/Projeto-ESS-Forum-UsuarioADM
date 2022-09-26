import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { nanoid } from 'nanoid'
import { NzStatus } from 'ng-zorro-antd/core/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { firstValueFrom, map, Observable } from 'rxjs'
import { AppState, changeUserInfo, changeUserLoggedStatus } from 'src/app/app.store'
import { UsersService } from 'src/app/services/users.service'
import { ApiResponse, emptyUser, User } from '../../../../../common/types'

@Component({
    selector: 'app-singup',
    templateUrl: './singup.component.html',
    styleUrls: ['./singup.component.css'],
})
export class SingupComponent implements OnInit {
    logged: Observable<Boolean> = this.store.select('app').pipe(
        map((state: AppState) => {
            return state.logged
        })
    )

    userCount: Observable<number> = this.store.select('app').pipe(
        map((state: AppState) => {
            return state.usersCount as number
        })
    )

    username: string = ''
    name: string = ''
    password: string = ''
    avatar: string = ''
    usernameInputStatus: NzStatus = ''
    passwordInputStatus: NzStatus = ''
    nameInputStatus: NzStatus = ''

    constructor(
        private router: Router,
        private store: Store<{ app: AppState }>,
        private userService: UsersService,
        private message: NzMessageService
    ) {}

    ngOnInit(): void {}

    validateUsername(): boolean {
        return (this.username != '') as boolean
    }

    validatePassword(): boolean {
        return (this.password != '') as boolean
    }

    validateName(): boolean {
        return (this.name != '') as boolean
    }

    validateSingup(): boolean {
        let validUsername: boolean = this.validateUsername()
        let validPassword: boolean = this.validatePassword()
        let validName: boolean = this.validateName()

        if (!validUsername) {
            this.usernameInputStatus = 'error'
        }

        if (!validPassword) {
            this.passwordInputStatus = 'error'
        }

        if (!validName) {
            this.nameInputStatus = 'error'
        }

        return validUsername && validPassword && validName
    }

    singup() {
        this.usernameInputStatus = ''
        this.passwordInputStatus = ''
        this.nameInputStatus = ''

        let valid: boolean = this.validateSingup()

        if (valid) {
            this.userService.login(this.username, this.password).subscribe(async (res: ApiResponse) => {
                if (res.status == 200) {
                    this.message.create('error', `This username is taken try another one!`)
                    this.usernameInputStatus = 'warning'
                } else {
                    let temp: User = emptyUser(nanoid())

                    temp.username = this.username
                    temp.name = this.name
                    temp.password = this.password
                    temp.avatar = this.avatar

                    this.userService.create(temp).subscribe(async (response: ApiResponse) => {
                        if (response.status == 200) {
                            this.message.create('success', `Account created!`)

                            this.store.dispatch(changeUserInfo({ payload: temp }))
                            this.store.dispatch(changeUserLoggedStatus({ payload: true }))

                            this.router.navigateByUrl('/home')
                        } else {
                            this.message.create('error', 'Something went wrong!')
                        }
                    })
                }
            })
        } else {
            this.message.create('error', 'Please fill the fields before continue!')
        }
    }
}
