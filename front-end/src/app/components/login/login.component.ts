import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { AppState, changeUserInfo, changeUserLoggedStatus } from 'src/app/app.store'
import { ApiResponse, User } from '../../../../../common/types'
import { UsersService } from 'src/app/services/users.service'
import { NzMessageService } from 'ng-zorro-antd/message'
import { firstValueFrom, map, Observable } from 'rxjs'
import { NzStatus } from 'ng-zorro-antd/core/types'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    logged: Observable<Boolean> = this.store.select('app').pipe(
        map((state: AppState) => {
            return state.logged
        })
    )

    username: string = ''
    password: string = ''
    usernameInputStatus: NzStatus = ''
    passwordInputStatus: NzStatus = ''

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

    validateLogin(): boolean {
        let validUsername: boolean = this.validateUsername()
        let validPassword: boolean = this.validatePassword()

        if (!validUsername) {
            this.usernameInputStatus = 'error'
        }

        if (!validPassword) {
            this.passwordInputStatus = 'error'
        }

        return validUsername && validPassword
    }

    login() {
        this.usernameInputStatus = ''
        this.passwordInputStatus = ''

        let valid: boolean = this.validateLogin()

        if (valid) {
            this.userService.login(this.username, this.password).subscribe(async (res: ApiResponse) => {
                if (res.status == 200) {
                    this.message.create('success', `Logged!`)
                    this.store.dispatch(changeUserInfo({ payload: res.result as User }))
                    this.store.dispatch(changeUserLoggedStatus({ payload: true }))

                    let previousURL: string = await firstValueFrom(
                        this.store.select('app').pipe(
                            map((state: AppState) => {
                                return state.previousURL
                            })
                        )
                    )

                    this.router.navigateByUrl(previousURL)
                } else {
                    this.message.create('error', `The credentials don't match or does not exist!`)

                    this.usernameInputStatus = 'warning'
                    this.passwordInputStatus = 'warning'
                }
            })
        } else {
            this.message.create('error', 'Please fill the fields before continue!')
        }
    }
}
